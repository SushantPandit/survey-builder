import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const currentUser = authService.currentUser();

  const requiredRole = route.data['role'];

  if (!currentUser) {
    router.navigate(['/login']);
    return false;
  }

  if (currentUser.role !== requiredRole) {
    router.navigate(['/login']);

    return false;
  }

  return true;
};
