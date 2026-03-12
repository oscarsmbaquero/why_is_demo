import { environment } from '../../../enviroment/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IUser, ILoginResponse } from '../../models/user-models';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private currentUserSubject = new BehaviorSubject<IUser | null>(null);
  public currentUser$: Observable<IUser | null>;
  key = environment.encriptKey;

  constructor(private httpClient: HttpClient) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
    this.currentUser$ = this.currentUserSubject.asObservable();
  }
  login(credentials: { user: string; password: string }): Observable<boolean> {
    const encryptedPassword = CryptoJS.AES.encrypt(
        credentials.password!,
        this.key
      ).toString();
    const endpoint = `${environment.apiUrlLogin}/users/login`;
    return this.httpClient.post<ILoginResponse>(endpoint, { ...credentials, password: encryptedPassword }).pipe(
      map((response) => {
        if (response?.status === 200 && response.data) {
          this.currentUserSubject.next(response.data);
          localStorage.setItem('user', JSON.stringify(response.data));
          return true;
        } else {
          return false;
        }
      })
    );
  }

  getCurrentUser(): Observable<IUser | null> {
    return this.currentUserSubject.asObservable();
  }

  setCurrentUser(user: IUser) {
    this.currentUserSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  clearCurrentUser() {
    this.currentUserSubject.next(null);
    localStorage.removeItem('user');
  }
}
