import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {Product} from "../../products/product.model";
import * as ProductSelectors from '../../products/product.selectors';
import * as ProductActions from '../../products/product.actions';
import * as CartActions from '../../cart/cart.actions';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss'
})
export class ProductList implements OnInit {

  private store = inject(Store)

  products$: Observable<Product[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<any | null>;


  constructor() {
    this.products$ = this.store.select(ProductSelectors.selectAllProducts);
    this.isLoading$ = this.store.select(ProductSelectors.selectProductsLoading);
    this.error$ = this.store.select(ProductSelectors.selectProductsError);
  }

  ngOnInit() {
    this.store.dispatch(ProductActions.loadProduct());
  }

  addToCart(productId: string, quantity: number) {
    this.store.dispatch(CartActions.addItem({productId, quantity}))
  }
}
