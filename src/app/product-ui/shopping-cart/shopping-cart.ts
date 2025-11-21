import {Component, inject} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Store} from "@ngrx/store";
import {CartItemDetailed} from "../../cart/cart.model";
import {Observable} from "rxjs";
import * as CartSelectors from '../../cart/cart.selectors'
import * as CartActions from '../../cart/cart.action'

@Component({
  selector: 'app-shopping-cart',
  imports: [CommonModule],
  templateUrl: './shopping-cart.html',
  styleUrl: './shopping-cart.scss'
})
export class ShoppingCart {

  private store = inject(Store)

  cartItem$: Observable<CartItemDetailed[]>;
  totalPrice$: Observable<number>;

  constructor() {
    this.cartItem$ = this.store.select(CartSelectors.selectCartItemsWithDetails);
    this.totalPrice$ = this.store.select(CartSelectors.selectCartTotalPrice);
  }

  increase(productId: string){
    this.store.dispatch(CartActions.decreaseQuantity({productId}))
  }

  decrease(productId: string){
    this.store.dispatch(CartActions.decreaseQuantity({productId}))
  }

  remove(productId: string){
    this.store.dispatch(CartActions.removeItem({productId}))
  }

  clearCart(){
    if(confirm('Are you sure you want to clear the cart?')){
      this.store.dispatch(CartActions.clearCart())
    }
  }
}
