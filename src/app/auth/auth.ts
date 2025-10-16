import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenResponse} from './auth.intarface';
import {catchError, tap, throwError} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  http: HttpClient = inject(HttpClient);
  router = inject(Router);
  cookieService = inject(CookieService)

  url: string = 'http://localhost:3000/';
  token: string | null = null;
  refresh_token: string | null = null;

  get isAuth(): boolean {
    if (!this.token) {
      this.token = this.cookieService.get('auth_token');
      this.refresh_token = this.cookieService.get('refresh_token');
    }
    return !!this.token;
  }

  login(payload: {username: string, password: string}) {

    return this.http.post<TokenResponse>(
      `${this.url}auth/signin`,
      payload
    ).pipe(
      tap(val => this.saveTokens(val))
    )
  }

  refreshAuthToken() {
    return this.http.post<TokenResponse>(
      `${this.url}auth/refresh`,
      {
          refresh_token: this.refresh_token
      }
    ).pipe(
      tap(val => {
        this.saveTokens(val)
      }),
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
}
