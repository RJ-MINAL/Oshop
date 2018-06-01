import { AuthService } from './../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppUser } from '../models/app-user';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'bs-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnDestroy{
  appUser: AppUser;
  userSubscription: Subscription;

  constructor(
    private auth: AuthService
  ) {
     this.userSubscription = auth.appUser$
      .subscribe(appUser  => this.appUser = appUser);
  }

  logout(){
    this.auth.logout();
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }

}
