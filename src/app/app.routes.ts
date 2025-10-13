import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import {SearchPage} from './pages/search-page/search-page';
import {ProfilePage} from './pages/profile-page/profile-page';
import {LayoutProfile} from './common-ui/layout-profile/layout-profile';
import {canActivateAuth} from './auth/access.gard';
import {SettingsPage} from './pages/settings-page/settings-page';
import {HomePage} from './pages/home-page/home-page';
import {Layout} from './layout/layout';

export const routes: Routes = [
  {path: '', component: Layout, children: [
      {path: '', component: HomePage},
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
