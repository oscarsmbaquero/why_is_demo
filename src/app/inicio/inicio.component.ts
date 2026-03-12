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
import { PopupComponent } from '../components/popup/popup.component';
import { NavbarComponent } from '../../core/components/navbar/navbar.component';
import { SoftwareComponent } from '../components/software/software.component';
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
  @ViewChild('serviciosIaSection') serviciosIaSection!: ElementRef;
  @ViewChild('softwareSection') softwareSection!: ElementRef;
  @ViewChild('aboutSection') aboutSection!: ElementRef;
  @ViewChild('contactSection') contactSection!: ElementRef;
  @ViewChildren('serviciosIaSection, softwareSection, aboutSection, contactSection')
  sections!: QueryList<ElementRef>;

  private scrollSpyObserver?: IntersectionObserver;

  constructor(
    private router: Router,
    public themeService: ThemeService,
    private navbarService: NavbarService
  ) {}

  ngAfterViewInit(): void {
    this.initSectionObservers();
    this.initScrollSpy();
  }

  ngOnDestroy(): void {
    if (this.scrollSpyObserver) {
      this.scrollSpyObserver.disconnect();
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

  navigate() {
    this.router.navigate(['facturas']);
  }
}
