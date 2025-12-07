import { HttpClient } from '@angular/common/http';
import {inject, Injectable, signal} from '@angular/core';
import { GuestService } from './guest';
import {ProfileService} from "./profile";
import {environment} from "../../../environments/environment";
import {toObservable} from "@angular/core/rxjs-interop";

export interface Cart {
  height: number,
  outerDiameter: number,
  innerDiameter: number,
  species: string,
  stateStandard: string,
  diameter: string,
  price: number,
  productId: string,
  quantity: number,
  length: string,
  threadLength: string,
  steelGrade: string,
}

interface CartPayload {
  guestId: string;
  sessionId: string;
  device: string;
  status: 'created';
  contact: {
    name: string;
    phone: string;
    email: string;
  };
  cart: Cart[];
  userMeta: {
    ip: string;
    userAgent: string;
    referer: string;
    createdAt: string;
  };
}

@Injectable({ providedIn: 'root' })
export class CartService {
  profileService = inject(ProfileService);
  baseUrl: string = environment.apiUsersUrl;
  constructor(
    private http: HttpClient,
    private guest: GuestService
  ) {

  }
  me$ = toObservable(this.profileService.me)
  // me = new BehaviorSubject<Profile | null>(null);
  me = this.profileService.me();

  sendCart(cartData: any) {
    //
    // this.profileService.getMe().subscribe(data => {
    //   console.log('subscribe with ME');
    //   const payload: CartPayload = {
    //     guestId: this.guest.getGuestId(),
    //     sessionId: this.guest.getSessionId(),
    //     device: this.guest.device,
    //     status: 'created',
    //     contact: {
    //       name: data.fullName,
    //       phone: '',
    //       email: data.email
    //     },
    //     cart: [],
    //     userMeta: {
    //       ip: '',
    //       userAgent: navigator.userAgent,
    //       referer: document.referrer || window.location.href,
    //       createdAt: new Date().toISOString()
    //     },
    //   };
    //   cartData.items.forEach((line: any) => {
    //     console.log("cartData = ");
    //     console.log(line);
    //     const cc: Cart = {
    //       diameter: line.diameter,
    //       height: line.height,
    //       innerDiameter: line.innerDiameter,
    //       length: line.length,
    //       outerDiameter: line.outerDiameter,
    //       price: line.price,
    //       productId: line.productId,
    //       quantity: line.quantity,
    //       species: line.species,
    //       stateStandard: line.stateStandard,
    //       steelGrade: line.steelGrade,
    //       threadLength: line.threadLength,
    //     }
    //     payload.cart.push(cc);
    //   })
    //   console.log('payload');
    //   console.log(payload);
    //
    //   this.http.post(`${environment.apiApplicationsUrl}cart/costs`, payload, {
    //     withCredentials: true
    //   }).subscribe()
    // })
    //
    this.profileService.getMe().subscribe(
      {
        next: (data) => {
            console.log('subscribe with ME');
            const payload: CartPayload = {
              guestId: this.guest.getGuestId(),
              sessionId: this.guest.getSessionId(),
              device: this.guest.device,
              status: 'created',
              contact: {
                name: data.fullName,
                phone: '',
                email: data.email
              },
              cart: [],
              userMeta: {
                ip: '',
                userAgent: navigator.userAgent,
                referer: document.referrer || window.location.href,
                createdAt: new Date().toISOString()
              },
            };
            cartData.items.forEach((line: any) => {
              console.log("cartData = ");
              console.log(line);
              const cc: Cart = {
                diameter: line.diameter,
                height: line.height,
                innerDiameter: line.innerDiameter,
                length: line.length,
                outerDiameter: line.outerDiameter,
                price: line.price,
                productId: line.productId,
                quantity: line.quantity,
                species: line.species,
                stateStandard: line.stateStandard,
                steelGrade: line.steelGrade,
                threadLength: line.threadLength,
              }
              payload.cart.push(cc);
            })
            console.log('payload');
            console.log(payload);

            this.http.post(`${environment.apiApplicationsUrl}cart/costs`, payload, {
              withCredentials: true
            }).subscribe()
        },
        error: (err) => {
          console.log('subscribe with error');
          const payload: CartPayload = {
            guestId: this.guest.getGuestId(),
            sessionId: this.guest.getSessionId(),
            device: this.guest.device,
            status: 'created',
            contact: {
              name: '',
              phone: '',
              email: ''
            },
            cart: [],
            userMeta: {
              ip: '',
              userAgent: navigator.userAgent,
              referer: document.referrer || window.location.href,
              createdAt: new Date().toISOString()
            },
          };
          cartData.items.forEach((line: any) => {
            console.log("cartData = ");
            console.log(line);
            const cc: Cart = {
              diameter: line.diameter,
              height: line.height,
              innerDiameter: line.innerDiameter,
              length: line.length,
              outerDiameter: line.outerDiameter,
              price: line.price,
              productId: line.productId,
              quantity: line.quantity,
              species: line.species,
              stateStandard: line.stateStandard,
              steelGrade: line.steelGrade,
              threadLength: line.threadLength,
            }
            payload.cart.push(cc);
          })
          console.log('payload');
          console.log(payload);

          this.http.post(`${environment.apiApplicationsUrl}cart/costs`, payload, {
            withCredentials: true
          }).subscribe()
        }
      }
    )
  }
}
