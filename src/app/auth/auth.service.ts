import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {TokenResponse} from "./auth.interface";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http: HttpClient = inject(HttpClient);

  token: string | null = null;
  refresh_token: string | null = null;

  get isAuth(): boolean {
    return !!this.token;
  }
  login(payload: {username: string, password: string}) {


    return this.http.post<TokenResponse>(
      `${environment.apiUrl}/auth/signin`,
      payload
      ).pipe(
        tap(val => {
          this.token = val.access_token;
          this.refresh_token = val.refresh_token;
        })
    )
  }
}
