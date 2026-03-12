import { Component, inject, OnInit, Output, EventEmitter } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.component.html',
  styleUrl: './cookies.component.css',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule],
})
export class CookiesComponent implements OnInit {

  private cookieService = inject(CookieService);
  cookiesAccepted = false;
  @Output() cookiesAcceptedEvent = new EventEmitter<boolean>();

  ngOnInit() {
    console.log('CookieService:', this.cookieService);
    this.cookiesAccepted = this.cookieService.check('cookiesAccepted');
    console.log('Cookie accepted?', this.cookiesAccepted);
    console.log('All cookies:', this.cookieService.getAll());
  }

  acceptCookies(): void {
    console.log('Aceptando cookies...');
    this.cookieService.set('cookiesAccepted', 'true', { expires: 365, path: '/', sameSite: 'Lax' });
    this.cookiesAccepted = true;
    console.log('Cookie guardada:', this.cookieService.get('cookiesAccepted'));
    // Lógica adicional para habilitar cookies no esenciales
    this.cookiesAcceptedEvent.emit(true);
    this.enableNonEssentialCookies();
  }

  rejectCookies(): void {
    console.log('Rechazando cookies...');
    this.cookieService.set('cookiesAccepted', 'false', { expires: 365, path: '/', sameSite: 'Lax' });
    this.cookiesAccepted = false;
    console.log('Cookie guardada:', this.cookieService.get('cookiesAccepted'));
    // Opcional: eliminar cookies no esenciales si ya se habían configurado
    this.cookiesAcceptedEvent.emit(false);
    this.disableNonEssentialCookies();
  }

  private enableNonEssentialCookies(): void {
    // Aquí activas cookies como las de Google Analytics, Facebook Pixel, etc.
   // console.log('Cookies no esenciales habilitadas.');
  }

  private disableNonEssentialCookies(): void {
    // Aquí puedes eliminar cookies no esenciales configuradas previamente
    //console.log('Cookies no esenciales deshabilitadas.');
  }

}
