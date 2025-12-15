import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {select, Store} from "@ngrx/store";
import {CartItemDetailed} from "../../cart/cart.model";
import {Observable, take} from "rxjs";
import * as CartSelectors from '../../cart/cart.selectors'
import * as CartActions from '../../cart/cart.actions'
import * as ProductActions from '../../products/product.actions'
import * as ProductSelectors from '../../products/product.selectors';
import {CartItem} from "../../cart/cart.model";
import {CartService} from "../../data/services/cart";
import {Product} from "../../products/product.model";

@Component({
  selector: 'app-shopping-cart',
  imports: [CommonModule],
  templateUrl: './shopping-cart.html',
  styleUrl: './shopping-cart.scss'
})

export class ShoppingCart implements OnInit {
  cartItems$!: Observable<CartItem[]>;
  private store = inject(Store)

  products: Product[] = []
  cartItem$: Observable<CartItemDetailed[]>;
  totalPrice$: Observable<number>;

  constructor(
    private cartService: CartService
  ) {
    this.cartItem$ = this.store.select(CartSelectors.selectCartItemsWithDetails);
    this.totalPrice$ = this.store.select(CartSelectors.selectCartTotalPrice);
  }

  increase(productId: string){
    this.store.dispatch(CartActions.increaseQuantity({productId}))
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
  processAndSendOrderOldSchool() {
    this.cartItem$
      .pipe(
        take(1)
      )
      .subscribe(
        (currentCartItems: CartItemDetailed[]) => {
          const orderItems = currentCartItems.map(item => {
              console.log(item);
              let ob = {
                height: 0,
                outerDiameter: 0,
                innerDiameter: 0,
                species: '',
                stateStandard: '',
                diameter: '',
                length: '',
                threadLength: '',
                steelGrade: '',
                productId: '',
                threadPitch: 0,
                spannerSize: 0,
                weightKg: 0,
                plateDimensions: '',
                anchorSpecifications: ''
              }
              console.log(this.store.select(ProductSelectors.selectProductById(item.productId))
                .pipe(take(1))
                .subscribe(product => {
                  console.log('product');
                  console.log(product);
                  ob.productId = product?.id!
                  ob.height = product?.height!
                  ob.outerDiameter = product?.outerDiameter!
                  ob.innerDiameter = product?.innerDiameter!
                  ob.species = product?.species!
                  ob.stateStandard = product?.stateStandard!
                  ob.diameter = product?.diameter!
                  ob.length = product?.length!
                  ob.threadLength = product?.threadLength!
                  ob.steelGrade = product?.steelGrade!
                  ob.threadPitch = product?.threadPitch!
                  ob.spannerSize = product?.spannerSize!
                  ob.weightKg = product?.weightKg!
                  ob.plateDimensions = product?.plateDimensions!
                  ob.anchorSpecifications = product?.anchorSpecifications!
                }))
            return ({
              ...ob,
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
              imageUrl: item.imageUrl,
          })
          }
          );

          const orderData = {
            items: orderItems,
            totalPrice: currentCartItems.reduce((acc, item) => acc + item.lineTotal, 0)
          };

          console.log('Отправляемые данные:', orderData);

          // Отправка на сервер
          this.cartService.sendCart(orderData)
          this.store.dispatch(CartActions.clearCart())
        }
      );
  }

  ngOnInit() {
    this.store.dispatch(ProductActions.loadProduct());

    this.cartItems$ = this.store.pipe(select(CartSelectors.selectorCartItems));

  }
}
