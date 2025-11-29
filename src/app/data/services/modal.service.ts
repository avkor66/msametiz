import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, map, Subject} from "rxjs";
import {IBrand} from "../interfaces/product.interface";
import {ProductService} from "./product.service";
import * as CartActions from "../../cart/cart.actions";
import {Store} from "@ngrx/store";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  productService = inject(ProductService)

  isVisible$ = new BehaviorSubject<boolean>(false);
  brand = new Subject<IBrand>();

  constructor(private store: Store) {}

  open(event: any) {
    const targetButton = event.currentTarget.dataset as HTMLButtonElement;
    this.productService.getBrands()
      .pipe(
        map(data => data.group101_164)
      )
      .subscribe(data  => {
          this.brand.next(data.filter(p => p.brand.includes(targetButton.id))[0]);
        }
      )
    this.isVisible$.next(true);
  }
  close() {
    this.isVisible$.next(false);
  }

  addToCart(event: any) {
    let uniqueId: string = ``;
    const quantity: number = 1

    const targetButton = event.currentTarget.dataset as HTMLButtonElement;
    this.productService.getBrands()
      .pipe(
        map(data => data.group101_164)
      )
      .subscribe(data  => {
        const brand = data.filter(p => p.brand.includes(targetButton.id))[0]
        this.brand.next(brand)
        console.log(data)
        console.log(brand)
        console.log(targetButton)
        uniqueId = `detail-1.400-15 Выпуск 1-${brand.brand}`
        console.log(uniqueId)
        this.store.dispatch(CartActions.addItem({
          productId: uniqueId,
          quantity: quantity
        }));
      })
  }
}
