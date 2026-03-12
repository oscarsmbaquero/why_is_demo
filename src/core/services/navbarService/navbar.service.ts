import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private readonly LOCAL_STORAGE_KEY = 'selectedOption';
  private selectedOptionSubject: BehaviorSubject<string>;
  private chatboxToggleSubject = new Subject<void>();
  chatboxToggle$ = this.chatboxToggleSubject.asObservable();


  constructor() { 
    const savedOption = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    this.selectedOptionSubject = new BehaviorSubject<string>(savedOption || '');
  }

  /**
   * funcion para el collapse del navbar
   * 
   */
  collapseNavbar(): void {
    const navbarToggler = document.querySelector('.navbar-toggler') as HTMLElement;
    //al iniciar el componente esta collapsado
    if (navbarToggler && navbarToggler.getAttribute('aria-expanded') === 'true') {
      navbarToggler.click();
    }
  }

  get selectedOption$() {
    return this.selectedOptionSubject.asObservable();
  }

  setSelectedOption(option: string) {
    console.log(option);
    
    this.selectedOptionSubject.next(option);
    localStorage.setItem(this.LOCAL_STORAGE_KEY, option);
  }

  toggleChatbox(): void {
    this.chatboxToggleSubject.next();
  }
}
