import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import AOS from 'aos';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-servicios-ia',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './servicios-ia.component.html',
  styleUrl: './servicios-ia.component.css'
})
export class ServiciosIaComponent implements OnInit, OnDestroy {

  private langChangeSubscription?: Subscription;

  constructor(
    private translate: TranslateService
  ) {}

  ngOnInit() {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false,
      mirror: true
    });
    this.loadServices();

    // Suscribirse a cambios de idioma
    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      this.loadServices();
    });
  }

  ngOnDestroy(): void {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

  showAllServices = false;
  initialLimit = 3;
  services: any[] = [];

  loadServices() {
    this.translate.get('SERVICIOS_IA.SERVICIOS').subscribe((servicios: any[]) => {
      this.services = servicios.map((servicio: any, index: number) => ({
        title: servicio.TITLE,
        description: servicio.DESCRIPTION,
        applications: servicio.APPLICATIONS,
        image: this.getServiceImage(index)
      }));
    });
  }

  getServiceImage(index: number): string {
    const images = [
      'assets/images/automatozacion.png',
      'assets/images/chatbox.webp',
      'assets/images/documentacion-interna.webp',
      'assets/images/procesamiento.jpg',
      'assets/images/analisis_datos.webp',
      'assets/images/prediccion.jpg',
      'assets/images/deteccion_errores.png',
      'assets/images/deteccion_textos.webp',
      'assets/images/traduccion.jpeg'
    ];
    return images[index] || 'assets/images/default.png';
  }

  oldServices = [

  // {
  //   title: 'Análisis de opiniones y encuestas',
  //   description:
  //     'Tratamiento automático de textos escritos por clientes para extraer conclusiones sobre satisfacción y problemas recurrentes.',
  //   applications: [
  //     'Reseñas',
  //     'Encuestas',
  //     'Comentarios',
  //     'Incidencias'
  //   ],
  //   image: 'assets/img/services/feedback.jpg'
  // },
  // {
  //   title: 'Generación de material gráfico',
  //   description:
  //     'Creación asistida de imágenes para uso comercial o corporativo.',
  //   applications: [
  //     'Catálogos',
  //     'Presentaciones',
  //     'Marketing',
  //     'Redes sociales'
  //   ],
  //   image: 'assets/img/services/graphics.jpg'
  // },
  // {
  //   title: 'Optimización de procesos internos',
  //   description:
  //     'Estudio de procesos actuales y aplicación de herramientas de IA para mejorar su eficiencia.',
  //   applications: [
  //     'Logística',
  //     'Producción',
  //     'Atención al cliente',
  //     'Gestión administrativa'
  //   ],
  //   image: 'assets/img/services/optimization.jpg'
  // },
  // {
  //   title: 'Formación práctica en IA aplicada',
  //   description:
  //     'Programas de formación orientados al uso real de la inteligencia artificial en el puesto de trabajo.',
  //   applications: [
  //     'Uso responsable de herramientas de IA',
  //     'Automatización básica',
  //     'Análisis de datos',
  //     'Redacción asistida'
  //   ],
  //   image: 'assets/img/services/training.jpg'
  // },
  // {
  //   title: 'Diagnóstico de oportunidades de IA',
  //   description:
  //     'Análisis inicial para identificar en qué áreas de la empresa es viable aplicar inteligencia artificial.',
  //   applications: [
  //     'Revisión de procesos',
  //     'Evaluación de datos',
  //     'Propuesta de mejoras',
  //     'Plan de implantación'
  //   ],
  //   image: 'assets/img/services/diagnosis.jpg'
  // },
  // {
  //   title: 'Desarrollo de soluciones personalizadas',
  //   description:
  //     'Diseño de herramientas adaptadas a las necesidades concretas del cliente.',
  //   applications: [
  //     'Sistemas automáticos de presupuestos',
  //     'Asistentes internos',
  //     'Paneles de control inteligentes',
  //     'Herramientas sectoriales'
  //   ],
  //   image: 'assets/img/services/custom-solutions.jpg'
  // }
];

get visibleServices() {
  return this.showAllServices
    ? this.services
    : this.services.slice(0, this.initialLimit);
}

toggleServices() {
  this.showAllServices = !this.showAllServices;
}


}
