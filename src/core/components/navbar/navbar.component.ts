import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; // Import the RouterModule here
import { Subscription } from 'rxjs';
import { NavbarService } from '../../services/navbarService/navbar.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../services/translateService/translate.service';
import { UsersService } from '../../services/users/users.service';
import { ThemeService } from '../../services/themeService/theme-service.service';
import { AuthService } from '../../services/authService/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnDestroy {
  navbarScrolled = false;
  userActive: any;

  currentTheme = 'Light';
  languageSelected = 'es';
  banderaUrl: string = '';
  currentLanguage: string | undefined;
  textoIdioma = '';
  selectedOption: string | undefined;
  private subscription: Subscription = new Subscription();
  selectedLanguage: string | undefined;
  activeUser: any;
  scrollPosition = 0;

  showLoginModal = false;

  constructor(
    private navbarService: NavbarService,
    public translate: TranslateService,
    public translationService: TranslationService,
    private usersService: UsersService,
    private router: Router,
    public themeService: ThemeService,
    public authService: AuthService
  ) {}

  private scrollHandler = this.onScroll.bind(this);

  ngOnInit(): void {
    window.addEventListener('scroll', this.scrollHandler);
    this.subscription = this.navbarService.selectedOption$.subscribe(
      (option: any) => {
        this.selectedOption = option;
      }
    );
    this.usersService.getCurrentUser().subscribe((user: any) => {
      this.userActive = user?.user || '';
    });
    this.translate.setDefaultLang('es');
    this.translationService.getCurrentLanguage().subscribe((lang: any) => {
      this.currentLanguage = lang;
      this.textoIdioma = lang.charAt(0).toUpperCase() + lang.slice(1);
    });
    // Solo selecciona 'inicio' si no hay una opción guardada previamente
    setTimeout(() => {
      if (!this.selectedOption || this.selectedOption === '') {
        this.selectOption('inicio');
      }
    }, 0);
  }

  onScroll() {
    this.navbarScrolled = window.scrollY > 60;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    window.removeEventListener('scroll', this.scrollHandler);
  }

  selectOption(option: string) {
    this.navbarService.setSelectedOption(option);
    this.toggleNavbar();

    const routeOptions = ['dashboard', 'contact'];
    if (routeOptions.includes(option)) {
      this.router.navigate([option]);
      return;
    }

    if (option === 'inicio') {
      this.router.navigate(['/']);
      return;
    }

    // Delay scroll para iOS - espera a que el offcanvas se cierre
    setTimeout(() => {
      this.scrollTo(option);
    }, 300);
  }

  toggleNavbar() {
    this.navbarService.collapseNavbar();
  }

  useLanguage(language: string) {
    console.log('entro', language);
    this.currentLanguage = language;
    this.languageSelected = language;
    this.selectedLanguage = language;
    this.translationService.changeLanguage(language);
    this.toggleNavbar();
  }

  // languageActual(){
  //   const prueba = this.translationService.getCurrentLanguage();
  //   this.banderaUrl = this.pintarIdioma(prueba);
  //   console.log(this.banderaUrl);

  // }

  pintarIdioma(idioma: string): string {
    let rutaBandera = '';

    switch (idioma) {
      case 'es': // Español
        rutaBandera = '../../../assets/images/spain.png';
        break;
      case 'en': // Inglés
        rutaBandera = '../../../assets/images/england.png';
        break;
      case 'euz': // Euskera
        rutaBandera = '../../../assets/images/ikurrina.png';
        break;
      default:
        rutaBandera = '../../../assets/images/spain.png';
    }

    return rutaBandera;
  }

  logout(): void {
    this.usersService.clearCurrentUser();
    this.router.navigate(['login']);
  }

  logoutUser(): void {
    this.authService.logout();
  }

  openChatbox(): void {
    this.navbarService.toggleChatbox();
  }

  scrollTo(sectionId: string) {
    const navbarHeight = 70; // Altura del navbar sticky

    if (sectionId === 'inicio') {
      // Scroll al top directamente
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Busca el elemento en la página actual
    const el = document.getElementById(sectionId);
    if (el) {
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navbarHeight,
        behavior: 'smooth'
      });
    }
  }
}
