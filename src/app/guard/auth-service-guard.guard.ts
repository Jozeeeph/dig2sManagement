import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

export const authServiceGuardGuard: CanActivateFn = (route, state) => {
  const router=inject(Router);
  const authService=inject(AuthServiceService);

  if(authService.isAuthenticated()){
    return true;
  }
  else{
    router.navigate(['/signin']);
    return true;
  }
};
