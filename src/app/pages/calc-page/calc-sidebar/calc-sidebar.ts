import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {filter, Observable, Subscription, tap} from "rxjs";
import {Store} from "@ngrx/store";
import * as CartSelectors from "../../../cart/cart.selectors";
import {CartItemDetailed} from "../../../cart/cart.model";

@Component({
  selector: 'app-calc-sidebar',
  imports: [
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './calc-sidebar.html',
  styleUrl: './calc-sidebar.scss'
})
export class CalcSidebar implements OnInit, OnDestroy {
  private store = inject(Store)
  currentUrl: string = '';
  private routerSubscription: Subscription | undefined;
  activeMenuItems: MenuItem[] = [];

  constructor(private router: Router) {
    this.cartItem$ = this.store.select(CartSelectors.selectCartItemsWithDetails);
  }

  cartItems = signal<number>(0)
  cartItem$: Observable<CartItemDetailed[]>;



  ngOnInit() {
    this.cartItem$.subscribe(item => {
      this.cartItems.set(item.length);
      }
    );
    this.setActiveMenu(this.router.url);

    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentUrl = event.urlAfterRedirects;
      console.log("currentUrl = ", this.currentUrl);
      if(this.currentUrl) {
        this.setActiveMenu(this.currentUrl);
      } else this.setActiveMenu('/admin');
    });
  }

  menuDashboardItems: MenuItem[] = [
    { label: 'Болты', icon: 'bi-screwdriver', link: '/calc/bolts', cascade: null },
    { label: 'Гайки', icon: 'bi-nut-fill', link: '/calc/nuts', cascade: null },
    { label: 'Шайбы', icon: 'bi-record-circle-fill', link: '/calc/washers', cascade: null }
  ];
  menuCartItems: MenuItem[] = [
    { label: 'Корзина', icon: 'bi-cart-dash-fill', link: '/calc/cart', cascade: null },
  ]
  menuCartOrders: MenuItem[] = [
    { label: 'Заявки', icon: 'bi-list-ol', link: '/calc/orders', cascade: null }
  ]
  menuDetailItems: MenuItem[] = [
    { label: 'Закладные', icon: 'bi-view-list', link: '/calc/embedded', cascade: null },
  ]
  menuUsersItems: MenuItem[] = [
    { label: 'Общие', icon: 'bi-speedometer2', link: '/admin/users', cascade: null },
    { label: 'Частные', icon: 'bi-table', link: '/admin/users/private', cascade: null }
  ];
  menuSettingsItems: MenuItem[] = [
    { label: 'Общие', icon: 'bi-speedometer2', link: '/admin/settings', cascade: null },
    { label: 'Калькулятор', icon: 'bi-table', link: '/admin/settings/calc', cascade: null }
  ];

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  setActiveMenu(url: string): void {
    if (url.startsWith('/admin/users')) {
      this.activeMenuItems = this.menuUsersItems;
    } else if (url.startsWith('/admin/settings')) {
      this.activeMenuItems = this.menuSettingsItems;
    } else {
      this.activeMenuItems = this.menuDashboardItems;
    }
  }
}

export interface MenuItem {
  label: string;
  icon: string;
  link: string;
  cascade: MenuItem[] | null;
}