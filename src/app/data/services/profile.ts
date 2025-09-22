import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable, tap} from 'rxjs';
import {Profile, User} from '../interfaces/profile.interface';
import {Pageable} from '../interfaces/pageable.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http: HttpClient = inject(HttpClient)

  baseApiUrl: string = 'https://icherniakov.ru/yt-course/';
  baseUrl: string = 'http://localhost:3000/';

  me = signal<Profile | null>(null);
  filteredProfiles = signal<Profile[]>([]);

  getTestAccounts(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.baseApiUrl}account/test_accounts`)
  }

  getAccount(id: string) {
    return this.http.get<Profile>(`${this.baseUrl}admin/${id}`, {
      withCredentials: true
    })
  }

  getMe(): Observable<Profile> {
    return this.http.get<Profile>(`${this.baseUrl}profile/me`, {
      withCredentials: true
    }).pipe(
      tap(res => this.me.set(res))
    )
  }

  getSubscribersShortList(subsAmount = 3) {
    return this.http.get<Pageable<User>>(`${this.baseUrl}admin/users`, {
      withCredentials: true
    }).pipe(
      map(res => res.users.slice(0, subsAmount))
    )
  }
  //TODO
  patchProfile(profile: Partial<Profile>) {
    return this.http.patch<Profile>(
      `${this.baseUrl}profile/update`,
      profile,
      { withCredentials: true }
    )
  }
  //TODO
  uploadAvatar(file: File) {
    const fd = new FormData();
    fd.append('image', file);
    return this.http.post<Profile>(
      `${this.baseUrl}profile/upload_image`,
      fd,
      { withCredentials: true }
    )
  }
  //TODO
  filterProfiles(params: Record<string, any>) {
    return this.http.get<Pageable<Profile>>(`${this.baseUrl}admin/users`, {
      params,
      withCredentials: true
    }).pipe(
      tap(res => this.filteredProfiles.set(res.users)),
    )
  }
}
