import { Router } from '@angular/router';
import { ConstantsService } from '../constants/constants.service';
import { inject } from '@angular/core';

export const AuthGuard = () => {

  const constants = inject(ConstantsService);
  const router = inject(Router);

  const user = constants.getSession();
  if (user) {
    return true;
  }else{
    return router.createUrlTree(['/login']); // Redirect to login
  }
};