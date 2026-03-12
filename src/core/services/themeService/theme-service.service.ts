import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly themeKey = 'app-theme';
  private readonly _theme = signal<'Dark' | 'Light'>(this.loadInitialTheme());

  readonly theme = computed(() => this._theme());

  constructor() {
    this.applyThemeClass(this._theme());
  }

  private loadInitialTheme(): 'Dark' | 'Light' {
    return (localStorage.getItem(this.themeKey) as 'Dark' | 'Light') || 'Dark';
  }

  setTheme(theme: 'Dark' | 'Light'): void {
    console.log(theme);
    
    this._theme.set(theme);
    localStorage.setItem(this.themeKey, theme);
    this.applyThemeClass(theme);
  }

  toggleTheme(): void {
    const newTheme = this._theme() === 'Dark' ? 'Light' : 'Dark';
    this.setTheme(newTheme);
  }

  private applyThemeClass(theme: 'Dark' | 'Light'): void {
    const body = document.body;
    body.classList.remove('Dark', 'Light');
    body.classList.add(theme);
  }
}
