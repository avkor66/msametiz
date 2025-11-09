import {inject} from "@angular/core";
import {Auth} from "./auth";
import {Router} from '@angular/router';

export const canActivateAdmin = () => {
  const authService = inject(Auth);
  const router = inject(Router);

  // Проверяем аутентификацию
  if (!authService.isAuth) {
    console.warn('Access denied: Authentication required');
    router.navigate(['/login']);
    return false;
  }

  // Проверяем роль администратора
  if (!authService.isAdmin()) {
    console.warn('Access denied: Admin rights required');
    router.navigate(['/']); // или на страницу "access-denied"
    return false;
  }

  return true;
};

