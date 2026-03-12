import { Component, OnInit, OnDestroy } from '@angular/core';
import AOS from 'aos';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-software',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './software.component.html',
  styleUrl: './software.component.css'
})
export class SoftwareComponent implements OnInit, OnDestroy {

  private langChangeSubscription?: Subscription;
  softwareCards: any[] = [];

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false,
      mirror: true
    });
    this.loadCards();

    // Suscribirse a cambios de idioma
    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      this.loadCards();
    });
  }

  ngOnDestroy(): void {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

  loadCards() {
    this.translate.get('SOFTWARE.CARDS').subscribe((cards: any[]) => {
      this.softwareCards = cards.map((card: any) => ({
        icon: card.ICON,
        title: card.TITLE,
        description: card.DESCRIPTION
      }));
    });
  }
}
