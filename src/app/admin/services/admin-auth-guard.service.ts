import { AuthService } from 'shared/services/auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import "rxjs/add/operator/map";

@Injectable()
export class AdminAuthGuard implements CanActivate{

  constructor(
    private auth: AuthService
  ) { }

  canActivate(){
    return this.auth.appUser$
      .map(appUser  => appUser.isAdmin);
  }

}
