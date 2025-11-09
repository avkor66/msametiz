import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';

interface IUser {
  id: string;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://api.msametiz96.ru/profile'; // или относительный путь: '/api/user'
  private url = 'http://localhost:3000';
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  logout() {
    this.http.post(`${environment.apiUsersUrl}auth/logout`, {}, {
      withCredentials: true
    }).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: () => {
        this.router.navigate(['/']);
      }
    });
  }

  getUser(): Observable<IUser> {
    return this.http.get<IUser>(`${environment.apiUsersUrl}profile/header`, {
      withCredentials: true
    });
  }
}
