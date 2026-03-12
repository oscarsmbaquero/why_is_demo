import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AppInitService {
  constructor(private cookieService: CookieService) {}

  initializeApp(): void {
    if (!this.cookieService.check('cookiesAccepted')) {
      this.cookieService.set('defaultCurrency', 'EUR', { expires: 30, path: '/' });
      this.cookieService.set('defaultLanguage', 'es', { expires: 30, path: '/' });
    }
  }
}
