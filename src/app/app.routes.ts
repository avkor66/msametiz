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
import {AboutPage} from './pages/about-page/about-page';
import {ProductDetail} from './pages/products-page/product-detail/product-detail';
import {NotFoundPage} from './pages/not-found-page/not-found-page';
import {AdminLayout} from "./admin-panel/components/admin-layout/admin-layout";
import {AdminDashboard} from "./admin-panel/components/admin-dashboard/admin-dashboard";
import {AdminUsers} from "./admin-panel/pages/admin-users/admin-users";
import {AdminSettings} from "./admin-panel/pages/admin-settings/admin-settings";
import {canActivateAdmin} from "./auth/admin.guard";
import {
  AdminDashboardOrders
} from "./admin-panel/components/admin-dashboard/admin-dashboard-orders/admin-dashboard-orders";
import {
  AdminDashboardProducts
} from "./admin-panel/components/admin-dashboard/admin-dashboard-products/admin-dashboard-products";
import {
  AdminDashboardCustomers
} from "./admin-panel/components/admin-dashboard/admin-dashboard-customers/admin-dashboard-customers";
import {AdminSettingsCalc} from "./admin-panel/pages/admin-settings/admin-settings-calc/admin-settings-calc";
import {AdminUsersPrivate} from "./admin-panel/pages/admin-users/admin-users-private/admin-users-private";
import {
  AdminDashboardSuppliers
} from "./admin-panel/components/admin-dashboard/admin-dashboard-suppliers/admin-dashboard-suppliers";
import {
  AdminDashboardWashers
} from "./admin-panel/components/admin-dashboard/admin-dashboard-products/admin-dashboard-washers/admin-dashboard-washers";
import {
  AdminDashboardSteels
} from "./admin-panel/components/admin-dashboard/admin-dashboard-products/admin-dashboard-steels/admin-dashboard-steels";
import {
  AdminDashboardPrice
} from "./admin-panel/components/admin-dashboard/admin-dashboard-suppliers/admin-dashboard-price/admin-dashboard-price";
import {
  AdminDashboardUpload
} from "./admin-panel/components/admin-dashboard/admin-dashboard-suppliers/admin-dashboard-upload/admin-dashboard-upload";
import {CalcLayout} from "./pages/calc-page/calc-layout/calc-layout";
import {CalcBolts} from "./pages/calc-page/calc-bolts/calc-bolts";
import {CalcWashers} from "./pages/calc-page/calc-washers/calc-washers";
import {CalcNuts} from "./pages/calc-page/calc-nuts/calc-nuts";
import {ShoppingCart} from "./product-ui/shopping-cart/shopping-cart";
import {CalcEmbedded} from "./pages/calc-page/calc-embedded/calc-embedded";
import {OrdersPage} from "./pages/orders-page/orders-page";
import {ResetPasswordPage} from "./pages/login-page/reset-password-page/reset-password-page";
import {CalcOrders} from "./pages/calc-page/calc-orders/calc-orders";

export const routes: Routes = [
  {path: '', component: Layout, children: [
      {path: '', component: HomePage},
      {path: 'contacts', component: ContactsPage},
      {path: 'products', component: ProductsPage},
      {path: 'products/:name', component: ProductDetail},
      {path: 'services', component: ServicesPage},
      {path: 'about', component: AboutPage},
      {path: 'password-reset/:token', component: ResetPasswordPage},
    ]},
  {path: 'calc', component: CalcLayout, children: [
      {path: '',  redirectTo: 'bolts', pathMatch: 'full'},
      {path: 'bolts', component: CalcBolts},
      {path: 'washers', component: CalcWashers},
      {path: 'nuts', component: CalcNuts},
      {path: 'cart', component: ShoppingCart},
      {path: 'embedded', component: CalcEmbedded},
      {path: 'orders', component: CalcOrders},
    ]},
  {path: 'account', component: LayoutProfile, children: [
      {path: '', redirectTo: 'profile/me', pathMatch: 'full'},
      {path: 'profile/:id', component: ProfilePage},
      {path: 'settings', component: SettingsPage},
      {path: 'orders', component: OrdersPage},
      {path: 'search', component: SearchPage},
      {path: 'admin', redirectTo: '/admin', pathMatch: 'prefix'},
    ],
    canActivate: [canActivateAuth]
  },
  {path: 'admin', component: AdminLayout, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboard },
      { path: 'orders', component: AdminDashboardOrders },
      { path: 'products', component: AdminDashboardProducts },
      { path: 'products/washer', component: AdminDashboardWashers },
      { path: 'products/steel', component: AdminDashboardSteels },
      { path: 'customers', component: AdminDashboardCustomers },
      { path: 'suppliers', component: AdminDashboardSuppliers },
      { path: 'suppliers/price', component: AdminDashboardPrice },
      { path: 'suppliers/upload', component: AdminDashboardUpload },
      { path: 'users', component: AdminUsers },
      { path: 'users/private', component: AdminUsersPrivate },
      { path: 'settings', component: AdminSettings },
      { path: 'settings/calc', component: AdminSettingsCalc },
    ],
    canActivate: [canActivateAdmin]
  },
  {path: 'login', component: LoginPage},
  {path: '**', component: Layout, children: [
    {path: '', component: NotFoundPage},
  ]}
];
