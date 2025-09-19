import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenResponse} from './auth.intarface';
import {tap} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  http: HttpClient = inject(HttpClient);
  cookieService = inject(CookieService)

  url: string = 'http://localhost:3000/';
  token: string | null = null;
  refreshToken: string | null = null;

  get isAuth(): boolean {
    if (!this.token) {
      this.token = this.cookieService.get('token');
    }
    return !!this.token;

  }

  login(payload: {username: string, password: string}) {

    return this.http.post<TokenResponse>(
      `${this.url}auth/signin`,
      payload
    ).pipe(
      tap(val => {
        console.log(val)
        this.token = val.auth_token;
        this.refreshToken = val.refresh_token;

        this.cookieService.set('token', this.token)
        this.cookieService.set('refreshToken', this.refreshToken)
      })
    )
  }
}
