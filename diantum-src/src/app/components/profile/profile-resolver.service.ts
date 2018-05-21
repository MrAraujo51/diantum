import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { AuthService } from '../../service/auth.service';

@Injectable()
export class ProfileResolver implements Resolve<any> {
  constructor(
    public authService: AuthService,
    public router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.authService.getProfile()

  }
}
