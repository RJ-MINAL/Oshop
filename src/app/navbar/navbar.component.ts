import { ShoppingCartService } from './../services/shopping-cart.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppUser } from '../models/app-user';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'bs-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy{
  appUser: AppUser;
  userSubscription: Subscription;
  shoppingCartItemCount: number;

  constructor(
    private auth: AuthService,
    private cartService: ShoppingCartService
  ) { }

  logout(){
    this.auth.logout();
  }

  async ngOnInit(){
    this.userSubscription = this.auth.appUser$
    .subscribe(appUser  => this.appUser = appUser);

    let cart$ = await this.cartService.getCart();
      cart$.subscribe(cart => {
        this.shoppingCartItemCount = 0;
        for(let productId in cart.items)
          this.shoppingCartItemCount += cart.items[productId].quantity;
      });
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }

}
