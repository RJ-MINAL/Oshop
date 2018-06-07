import { ShoppingCartService } from './../services/shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from './../models/product';
import { Subscription } from 'rxjs/Subscription';
import { ProductService } from './../services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  subscription: Subscription;
  category: string;
  cart: any;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    private cartService: ShoppingCartService
  ) {
      productService
        .getAll()
        .switchMap(products => {
          this.products = products;
          return route.queryParamMap;
      })
      .subscribe(params => {
        this.category = params.get('category');
        
        this.filteredProducts = (this.category)? 
          this.products.filter(p => p.category === this.category)
          : this.products;
      });
  }

  async ngOnInit(){
    this.subscription = (await this.cartService.getCart())
      .subscribe(cart => this.cart = cart);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
