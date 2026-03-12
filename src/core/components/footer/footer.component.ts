import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/themeService/theme-service.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../../services/translateService/translate.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  currentLanguage: string = 'es';

  constructor(
     public themeService: ThemeService,
     public translationService: TranslationService,
  ) {}

  ngOnInit(): void {
    this.translationService.getCurrentLanguage().subscribe((lang) => {
      this.currentLanguage = lang;
    });
  }

  getFecha(): number {
    return new Date().getFullYear();
  }

  useLanguage(language: string): void {
    this.currentLanguage = language;
    this.translationService.changeLanguage(language);
  }
}
