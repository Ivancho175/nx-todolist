import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const token = localStorage.getItem('nx-todolist-token');
  const router = inject(Router);
  if (!token) {
    router.navigate(['home']);
    return false;
  }
  return true;
};
