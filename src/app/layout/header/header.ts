import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {SvgIcon} from '../../common-ui/svg-icon/svg-icon';
import {CookieService} from 'ngx-cookie-service';
import {UserService} from '../../data/services/user'


@Component({
  selector: 'app-header',
  imports: [
    RouterLinkActive,
    SvgIcon,
    RouterLink
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  token: string | undefined;
  username: string | null = null;
  email: string | null = null;

  constructor(
    private cookieService: CookieService,
    private userService: UserService,
  ) {}

  onLogout() {
    console.log('Logout');
    this.username = null;
    this.email = null;
    return this.userService.logout();
  }


  ngOnInit() {
    // Проверяем, существует ли куки

    this.userService.getUser().subscribe({
      next: (user) => {
        this.username = user.name;
        this.email = user.email;
      },
      error: (err) => {
        console.error('Не удалось загрузить данные пользователя', err);
      }
    });

    if (this.cookieService.check('auth_token')) {
      this.token = this.cookieService.get('auth_token');
      console.log('Token from cookie:', this.token);

    } else {
      console.log('No auth_token cookie found');
    }
  }
  menuItems = [
    {
      label: 'Главная',
      icon: 'main',
      link: '/'
    },
    {
      label: 'Продукция',
      icon: 'products',
      link: '/products'
    },
    {
      label: 'Услуги',
      icon: 'services',
      link: '/services'
    },
    {
      label: 'Калькулятор',
      icon: 'calc',
      link: '/calc'
    },
    {
      label: 'О нас',
      icon: 'about',
      link: '/about'
    },
    {
      label: 'Контакты',
      icon: 'contacts',
      link: '/contacts'
    }
  ]
}
