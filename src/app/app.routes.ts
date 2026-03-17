import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { CookiesPolicyComponent } from '../shared/components/cookies-policy/cookies-policy.component';
import { PrivacyPolicyComponent } from '../shared/components/privacy-policy/privacy-policy.component';

import { FacturasComponent } from './components/facturas/facturas.component';
import { ContactComponent } from './components/contact/contact.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';


export const routes: Routes = [
  {
    path: "",//raiz de la app
    pathMatch: 'full',//coincida nombre exacto
    component: InicioComponent,
    data: {
      seo: {
        title: 'WHY? IA | Desarrollo de Software y Soluciones de IA',
        description:
          'Impulsamos tu negocio con desarrollo web, automatización e inteligencia artificial a medida.',
        robots: 'index,follow',
      },
    },
  },
  {
    path: "facturas",
    component: FacturasComponent,
    data: {
      seo: {
        title: 'Facturas | WHY? IA',
        description: 'Sube y gestiona tus facturas con IA.',
        robots: 'noindex,follow',
      },
    },
  },
  {
    path: "contact",
    component: ContactComponent,
    data: {
      seo: {
        title: 'Contacto | WHY? IA',
        description: 'Ponte en contacto con WHY? IA.',
        robots: 'index,follow',
      },
    },
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    data: {
      seo: {
        title: 'Dashboard n8n | WHY? IA',
        description: 'Panel de control de workflows y ejecuciones de n8n.',
        robots: 'noindex,nofollow',
      },
    },
  },
  {
    path: "proyectos",
    component: ProyectosComponent,
    data: {
      seo: {
        title: 'Proyectos | WHY? IA',
        description: 'Panel de control de proyectos y ejecuciones de n8n.',
        robots: 'noindex,nofollow',
      },
    },
  },
  {
    path: "cookies-policy",
    component: CookiesPolicyComponent,
    data: {
      seo: {
        title: 'Política de Cookies | WHY? IA',
        description: 'Conoce cómo WHY? IA utiliza cookies para mejorar la experiencia de navegación.',
        robots: 'noindex,follow',
      },
    },
  },
  {
    path: "privacy-policy",
    component: PrivacyPolicyComponent,
    data: {
      seo: {
        title: 'Política de Privacidad | WHY? IA',
        description: 'Consulta cómo WHY? IA recopila, utiliza y protege tus datos personales.',
        robots: 'noindex,follow',
      },
    },
  }
];
