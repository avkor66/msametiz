import {Component, inject} from '@angular/core';
import {SvgIcon} from '../svg-icon/svg-icon';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {ProfileService} from '../../data/services/profile';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {SubscriberCard} from './subscriber-card/subscriber-card';
import {firstValueFrom} from 'rxjs';
import {ImgUrlPipe} from '../../helpers/pipes/img-url-pipe';

@Component({
  selector: 'app-sidebar',
  imports: [SvgIcon, RouterLink, ImgUrlPipe, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {
  profileService = inject(ProfileService);

  subscribers$ = this.profileService.getSubscribersShortList()
  me = this.profileService.me;
  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: 'profile/me'
    },
    {
      label: 'Заявки',
      icon: 'chats',
      link: 'orders'
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: 'search'
    },
    {
      label: 'Admin',
      icon: 'settings',
      link: 'admin'
    }
  ]

  ngOnInit(): void {
    firstValueFrom(this.profileService.getMe())
  }

}
