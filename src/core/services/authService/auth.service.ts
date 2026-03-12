import { Injectable, signal } from '@angular/core';
import { UsersService } from '../users/users.service';
import { IUser } from '../../models/user-models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = signal<IUser | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private usersService: UsersService) {
    this.loadFromStorage();
    this.usersService.getCurrentUser().subscribe((user) => {
      this.user.set(user);
    });
  }

  login(credentials: { user: string; password: string }): void {
    this.loading.set(true);
    this.error.set(null);

    this.usersService.login(credentials).subscribe({
      next: (success) => {
        this.loading.set(false);
        console.log();
        
        if (!success) {
          this.error.set('Usuario o contraseña incorrectos');
        }
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Error de conexión. Inténtalo de nuevo.');
      },
    });
  }

  logout(): void {
    this.usersService.clearCurrentUser();
    this.user.set(null);
  }

  isLoggedIn(): boolean {
    return this.user() !== null;
  }

  private loadFromStorage(): void {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        this.user.set(JSON.parse(stored));
      } catch {
        localStorage.removeItem('user');
      }
    }
  }
}
