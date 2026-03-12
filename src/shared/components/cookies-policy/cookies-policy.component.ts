import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cookies-policy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cookies-policy.component.html',
  styleUrls: ['./cookies-policy.component.css']
})
export class CookiesPolicyComponent {
  lastUpdated = 'Febrero 2026';
}
