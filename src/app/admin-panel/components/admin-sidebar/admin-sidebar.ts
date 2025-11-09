import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {filter, Subscription} from "rxjs";

@Component({
  selector: 'app-admin-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './admin-sidebar.html',
  styleUrl: './admin-sidebar.scss'
})
export class AdminSidebar implements OnInit, OnDestroy {
  currentUrl: string = '';
  private routerSubscription: Subscription | undefined;
  activeMenuItems: MenuItem[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
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
  // Ваши исходные данные
  menuDashboardItems: MenuItem[] = [
    { label: 'Панель', icon: 'bi-speedometer2', link: '/admin/dashboard' },
    { label: 'Заказы', icon: 'bi-table', link: '/admin/orders' },
    { label: 'Продукция', icon: 'bi-grid', link: '/admin/products' },
    { label: 'Покупатели', icon: 'bi-people', link: '/admin/customers' },
    { label: 'Поставщики', icon: 'bi-people', link: '/admin/suppliers' }
  ];
  menuUsersItems: MenuItem[] = [
    { label: 'Общие', icon: 'bi-speedometer2', link: '/admin/users' },
    { label: 'Частные', icon: 'bi-table', link: '/admin/users/private' }
  ];
  menuSettingsItems: MenuItem[] = [
    { label: 'Общие', icon: 'bi-speedometer2', link: '/admin/settings' },
    { label: 'Калькулятор', icon: 'bi-table', link: '/admin/settings/calc' }
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
}