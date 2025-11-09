import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenResponse} from './auth.intarface';
import {catchError, Observable, tap, throwError} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {AuthUser} from "../data/interfaces/profile.interface";


@Injectable({
  providedIn: 'root'
})
export class Auth {
  http: HttpClient = inject(HttpClient);
  router = inject(Router);
  cookieService = inject(CookieService)
  private currentUser = signal<AuthUser | null>(null);

  url: string = environment.apiUsersUrl;
  token: string | null = null;
  refresh_token: string | null = null;

  get isAuth(): boolean {
    if (!this.token) {
      this.token = this.cookieService.get('auth_token');
      this.refresh_token = this.cookieService.get('refresh_token');
    }
    return !!this.token;
  }

  getCurrentUser(): AuthUser | null {
    return this.currentUser();
  }

  isAdmin(): boolean {
    const user = this.currentUser();
    // return user?.role === 'admin';
    return true;
  }

  loadUser(): Observable<AuthUser> {
    return this.http.get<AuthUser>(`${this.url}profile/me`).pipe(
      tap(user => {
        this.currentUser.set(user);
      }),
      catchError(error => {
        console.error('Error loading user data:', error);
        this.currentUser.set(null);
        return throwError(() => error);
      })
    );
  }

  /**
   * Инициализация пользователя при старте приложения
   */
  initializeUser(): void {
    console.log('Initializing user');
    console.log(this.isAuth);
    console.log(this.isAdmin())
    // if (this.isAuth) {
    //   this.loadUser().subscribe({
    //     error: () => {
    //
    //       this.logout();
    //     }
    //   });
    // }
  }

  login(payload: {username: string, password: string}) {

    return this.http.post<TokenResponse>(
      `${this.url}auth/signin/`,
      payload, { withCredentials: true }
    ).pipe(
      tap(val => {
        console.log(val)
        this.saveTokens(val)
      })
    )
  }

  refreshAuthToken() {
    return this.http.post<TokenResponse>(
      `${this.url}auth/refresh`,
      {
          refresh_token: this.refresh_token
      }
    ).pipe(
      tap(val => this.saveTokens(val)),
      catchError(err => {
        this.logout()
        return throwError(err)
      })
    )
  }

  logout() {
    this.token = null;
    this.refresh_token = null;
    this.cookieService.delete('auth_token');
    this.cookieService.delete('refresh_token');
    this.router.navigate(['/login']);
  }

  saveTokens( res: TokenResponse) {
    this.token = res.auth_token;
    this.refresh_token = res.refresh_token;
    this.cookieService.set('auth_token', this.token)
    this.cookieService.set('refresh_token', this.refresh_token)
  }

  updateUser(userData: Partial<AuthUser>): void {
    const currentUser = this.currentUser();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...userData };
      this.currentUser.set(updatedUser);
    }
  }
}
