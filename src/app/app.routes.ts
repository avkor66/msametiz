import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import {SearchPage} from './pages/search-page/search-page';
import {ProfilePage} from './pages/profile-page/profile-page';
import {LayoutProfile} from './common-ui/layout-profile/layout-profile';
import {canActivateAuth} from './auth/access.gard';
import {SettingsPage} from './pages/settings-page/settings-page';
import {HomePage} from './pages/home-page/home-page';
import {Layout} from './layout/layout';
import {ContactsPage} from './pages/contacts-page/contacts-page';
import {ServicesPage} from './pages/services-page/services-page';
import {ProductsPage} from './pages/products-page/products-page';
import {CalcPage} from './pages/calc-page/calc-page';
import {AboutPage} from './pages/about-page/about-page';
import {ProductDetail} from './pages/products-page/product-detail/product-detail';

export const routes: Routes = [
  {path: '', component: Layout, children: [
      {path: '', component: HomePage},
      {path: 'contacts', component: ContactsPage},
      {path: 'calc', component: CalcPage},
      {path: 'products', component: ProductsPage},
      {path: 'products/:name', component: ProductDetail},
      {path: 'services', component: ServicesPage},
      {path: 'about', component: AboutPage},
    ]},
  {
    path: 'users', component: LayoutProfile, children: [
      {path: '', redirectTo: 'profile/me', pathMatch: 'full'},
      {path: 'profile/:id', component: ProfilePage},
      {path: 'settings', component: SettingsPage},
      {path: 'search', component: SearchPage},
    ],
    canActivate: [canActivateAuth]
  },
  {path: 'login', component: LoginPage},
];
