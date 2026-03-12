import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {

  fullName = 'Óscar Sánchez-Marín Baquero';
  isShrunk = false;

  @HostListener('window:scroll', [])
  onScroll() {
    this.isShrunk = window.scrollY > 600;
  }

  getInitials(name: string): string {
  const parts = name.trim().split(' ');

  if (parts.length < 2) return name;

  // const firstName = parts[0][0].toUpperCase(); // 'O'
  // const surnamePart = parts.slice(1).join(' '); // "Sanchez-Marin Baquero"

  // const surnames = surnamePart.split(' ');

  // let second = '';
  // if (surnames[0].includes('-')) {
  //   const [a, b] = surnames[0].split('-');
  //   second = a[0].toUpperCase() + '-' + b[0].toUpperCase(); // 'S-M'
  // } else {
  //   second = surnames[0][0].toUpperCase(); // 'S'
  // }

  // const third = surnames[1]?.[0]?.toUpperCase() || ''; // 'B'

  // return `${firstName}${second}${third ? '' + third : ''}`;
  return `oscarsmbaquero@gmail.com`;
}

}
