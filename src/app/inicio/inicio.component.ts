import {Component} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeService } from '../../core/services/themeService/theme-service.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent {
}
