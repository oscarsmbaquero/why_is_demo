import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/authService/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(public authService: AuthService) {}

  onSubmit(): void {
    if (!this.username.trim() || !this.password.trim()) return;
    this.authService.login({ user: this.username, password: this.password });
  }

  logout(): void {
    this.authService.logout();
  }
}
