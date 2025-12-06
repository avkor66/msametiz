import {Component, inject, OnInit, signal} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {SvgIcon} from '../../common-ui/svg-icon/svg-icon';
import {CookieService} from 'ngx-cookie-service';
import {UserService} from '../../data/services/user'
import {Observable} from "rxjs";
import {CartItemDetailed} from "../../cart/cart.model";
import * as CartSelectors from "../../cart/cart.selectors";
import {Store} from "@ngrx/store";
import * as ProductActions from "../../products/product.actions";


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
export class Header implements OnInit {
  token: string | undefined;
  private store = inject(Store)
  username: string | null = null;
  email: string | null = null;

  cartItems = signal<number>(0)
  cartItem$: Observable<CartItemDetailed[]>;

  constructor(
    private cookieService: CookieService,
    private userService: UserService,
  ) {
    this.cartItem$ = this.store.select(CartSelectors.selectCartItemsWithDetails);
}

  onLogout() {
    console.log('Logout');
    this.username = null;
    this.email = null;
    return this.userService.logout();
  }


  ngOnInit() {
    this.cartItem$.subscribe(item => {
        this.cartItems.set(item.length);
      }
    );

    this.store.dispatch(ProductActions.loadProduct());

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
      link: '/',
      exact: true,
    },
    {
      label: 'Продукция',
      icon: 'products',
      link: '/products',
      exact: false,
    },
    {
      label: 'Услуги',
      icon: 'services',
      link: '/services',
      exact: false,
    },
    {
      label: 'Калькулятор',
      icon: 'calc',
      link: '/calc',
      exact: false,
    },
    {
      label: 'О нас',
      icon: 'about',
      link: '/about',
      exact: true,
    },
    {
      label: 'Контакты',
      icon: 'contacts',
      link: '/contacts',
      exact: true,
    }
  ]
}
