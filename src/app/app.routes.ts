import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { CookiesPolicyComponent } from '../shared/components/cookies-policy/cookies-policy.component';
import { PrivacyPolicyComponent } from '../shared/components/privacy-policy/privacy-policy.component';


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
