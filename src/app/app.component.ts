import { Component, HostListener, inject } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { TranslateModule } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { ThemeService } from '../core/services/themeService/theme-service.service';
import { NavbarService } from '../core/services/navbarService/navbar.service';
import { SeoService } from '../core/services/seo/seo.service';
import { AuthService } from '../core/services/authService/auth.service';
//COMPONENTS
import { NavbarComponent } from '../core/components/navbar/navbar.component';
import { FooterComponent } from '../core/components/footer/footer.component';
import { TranslationService } from '../core/services/translateService/translate.service';
import { ChatboxComponent } from '../shared/components/chatbox/chatbox.component';
import { LoginComponent } from './components/login/login.component';
import { UsersService } from '../core/services/users/users.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    //NavbarComponent,
    FooterComponent,
    CommonModule,
    TranslateModule,
    ChatboxComponent,
    LoginComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [TranslateModule],
})
export class AppComponent {
  readonly themeService = inject(ThemeService);

  title = 'why? IA';
  scrollPosition = 0;

  languages = [
    { code: 'es', label: 'es', img: 'assets/images/espana.webp' },
    { code: 'en', label: 'en', img: 'assets/images/england.avif' },
  ];
  selectedLang = 'es';
  //dropdownOpen = false;
  ajustesOpen = false;
  selectedTheme = 'Light';
  modalChatBox = false;
  showChatbox = false;
  showCookieBanner = true;
  userActive = '';

  constructor(
    private translationService: TranslationService,
    private navbarService: NavbarService,
    private router: Router,
    private cookieService: CookieService,
    private seoService: SeoService,
    public authService: AuthService,
    private usersService: UsersService,
  ) {
    this.translationService.getCurrentLanguage().subscribe((lang) => {
      this.selectedLang = lang;
    });
  }

  ngOnInit() {
    this.themeService.setTheme('Light');
    
    // Suscribirse al toggle del chatbox desde el navbar
    this.navbarService.chatboxToggle$.subscribe(() => {
      this.modalChatBox = !this.modalChatBox;
    });

     this.usersService.getCurrentUser().subscribe((user) => {
      this.userActive = user?.user || '';
    });
    
    // Verificar si el usuario ya tomó una decisión sobre cookies
    const hasCookieDecision = this.cookieService.check('cookiesAccepted');
    this.showCookieBanner = !hasCookieDecision;
    this.showChatbox = hasCookieDecision;
    
    // Detectar cambios de ruta para ocultar chatbox en páginas de políticas
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const url = event.url;
      const isNotPolicyPage = !url.includes('/cookies-policy') && !url.includes('/privacy-policy');
      if (!isNotPolicyPage) {
        this.showChatbox = false;
        this.modalChatBox = false;
      } else if (hasCookieDecision) {
        this.showChatbox = true;
      }

      const routeData = this.router.routerState.snapshot.root.firstChild?.data?.['seo'];
      this.seoService.updateTags(routeData || {}, url);
    });

    const currentPath = this.router.url || '/';
    const initialRouteData = this.router.routerState.snapshot.root.firstChild?.data?.['seo'];
    this.seoService.updateTags(initialRouteData || {}, currentPath);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
     this.navbarService.setSelectedOption('inicio');
  }

  selectLang() {
    this.selectedLang = this.selectedLang === 'es' ? 'en' : 'es';
    this.translationService.changeLanguage(this.selectedLang);
  }

  selectTheme() {
    this.selectedTheme = this.selectedTheme === 'Dark' ? 'Light' : 'Dark';
    this.themeService.toggleTheme();
  }

  getLabel(code: string): string {
    const lang = this.languages.find((l) => l.code === code);
    return lang ? lang.label : code;
  }

  ajustes() {
    this.ajustesOpen = !this.ajustesOpen;
  }

   abrirModalChatBox() {
    this.modalChatBox = true;
  }

  cerrarModalChatBox() {
    this.modalChatBox = false;
  }

  handleCookiesAccepted(accepted: boolean) {
    console.log('Cookies decision:', accepted);
    // Ocultar banner de cookies y mostrar chatbox
    this.showCookieBanner = false;
    const currentUrl = this.router.url;
    const isNotPolicyPage = !currentUrl.includes('/cookies-policy') && !currentUrl.includes('/privacy-policy');
    this.showChatbox = isNotPolicyPage;
  }
}
