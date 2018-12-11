import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  redirectUrl;

  constructor(
    public authService: AuthService,
    public router: Router
  ){ }

  canActivate(
    router: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ){
    if (this.authService.loggedIn()) {
      return true;
    } else {
      this.redirectUrl = state.url;
      this.router.navigate(['/signin']);
      return false;
    }
  }
}
