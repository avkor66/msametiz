import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {SvgIcon} from '../../common-ui/svg-icon/svg-icon';

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
      icon: 'contacts',
      link: '/about'
    },
    {
      label: 'Контакты',
      icon: 'contacts',
      link: '/contacts'
    }
  ]
}
