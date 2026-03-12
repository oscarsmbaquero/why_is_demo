import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { Router } from '@angular/router';
import { AboutComponent } from '../components/about/about.component';
import { ContactComponent } from '../components/contact/contact.component';
import { ProjectsComponent } from '../components/projects/projects.component';
import { ServiciosIaComponent } from '../components/servicios-ia/servicios-ia.component';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeService } from '../../core/services/themeService/theme-service.service';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import Typed from 'typed.js';
import { PopupComponent } from '../components/popup/popup.component';
import { NavbarComponent } from '../../core/components/navbar/navbar.component';
import { SoftwareComponent } from '../components/software/software.component';
import { Subscription } from 'rxjs';
import { NavbarService } from '../../core/services/navbarService/navbar.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    AboutComponent,
    ContactComponent,
    ProjectsComponent,
    NavbarComponent,
    PopupComponent,
    TranslateModule,
    CommonModule,
    NavbarComponent,
    ServiciosIaComponent,
    SoftwareComponent
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent implements AfterViewInit, OnDestroy {
  @ViewChild('typingTitle', { static: true }) typingTitle!: ElementRef;
  @ViewChild('typingName', { static: true }) typingName!: ElementRef;
  @ViewChild('typingSubtitle', { static: true }) typingSubtitle!: ElementRef;
  @ViewChild('serviciosIaSection') serviciosIaSection!: ElementRef;
  @ViewChild('softwareSection') softwareSection!: ElementRef;
  @ViewChild('aboutSection') aboutSection!: ElementRef;
  @ViewChild('contactSection') contactSection!: ElementRef;
  @ViewChildren('serviciosIaSection, softwareSection, aboutSection, contactSection')
  sections!: QueryList<ElementRef>;

  private langChangeSubscription?: Subscription;
  private typedInstances: Typed[] = [];
  private scrollSpyObserver?: IntersectionObserver;

  constructor(
    private router: Router,
    public themeService: ThemeService,
    private translate: TranslateService,
    private navbarService: NavbarService
  ) {}

  ngAfterViewInit(): void {
    this.initSectionObservers();
    this.initScrollSpy();
    this.initTypingAnimation();

    // Suscribirse a cambios de idioma
    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      this.destroyTypedInstances();
      this.initTypingAnimation();
    });
  }

  ngOnDestroy(): void {
    this.destroyTypedInstances();
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
    if (this.scrollSpyObserver) {
      this.scrollSpyObserver.disconnect();
    }
  }

  private destroyTypedInstances(): void {
    this.typedInstances.forEach(typed => typed.destroy());
    this.typedInstances = [];
    // Limpiar el contenido de los elementos
    if (this.typingTitle?.nativeElement) {
      this.typingTitle.nativeElement.textContent = '';
    }
    if (this.typingName?.nativeElement) {
      this.typingName.nativeElement.textContent = '';
    }
    if (this.typingSubtitle?.nativeElement) {
      this.typingSubtitle.nativeElement.textContent = '';
    }
  }

  private initSectionObservers(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.classList.add('is-visible');
            observer.unobserve(entry.target); // solo la primera vez
          }
        });
      },
      { threshold: 0.2 }
    );

    this.sections.forEach((section) => {
      observer.observe(section.nativeElement);
    });
  }

  private initScrollSpy(): void {
    const options = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    this.scrollSpyObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.querySelector('[id]')?.id;
          if (sectionId) {
            this.navbarService.setSelectedOption(sectionId);
          }
        }
      });
    }, options);

    // Observar todas las secciones
    setTimeout(() => {
      if (this.serviciosIaSection) {
        this.scrollSpyObserver?.observe(this.serviciosIaSection.nativeElement);
      }
      if (this.softwareSection) {
        this.scrollSpyObserver?.observe(this.softwareSection.nativeElement);
      }
      if (this.aboutSection) {
        this.scrollSpyObserver?.observe(this.aboutSection.nativeElement);
      }
      if (this.contactSection) {
        this.scrollSpyObserver?.observe(this.contactSection.nativeElement);
      }
    }, 0);
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    // Detectar si estamos en la parte superior de la página (sección inicio)
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollPosition < 200) {
      this.navbarService.setSelectedOption('inicio');
    }
  }

  private initTypingAnimation(): void {
    this.translate
      .get(['INICIO.TITULO', 'INICIO.SUBTITULO', 'INICIO.DESCRIPCION'])
      .subscribe((translations) => {
        const titleText = translations['INICIO.TITULO'];
        // const subtitleText = translations['INICIO.SUBTITULO'];
        const nameText = translations['INICIO.DESCRIPCION'].toUpperCase();

        // const subtitleTyped = () => {
        //   const typed = new Typed(this.typingSubtitle.nativeElement, {
        //     strings: [subtitleText],
        //     typeSpeed: 50,
        //     showCursor: false,
        //   });
        //   this.typedInstances.push(typed);
        //   return typed;
        // };

        const nameTyped = () => {
          const typed = new Typed(this.typingName.nativeElement, {
            strings: [nameText],
            typeSpeed: 50,
            showCursor: false,
            // onComplete: subtitleTyped,
          });
          this.typedInstances.push(typed);
          return typed;
        };

        const titleTyped = new Typed(this.typingTitle.nativeElement, {
          strings: [titleText],
          typeSpeed: 50,
          showCursor: false,
          onComplete: nameTyped,
        });
        this.typedInstances.push(titleTyped);
      });
  }

  navigate() {
    this.router.navigate(['facturas']);
  }
}
