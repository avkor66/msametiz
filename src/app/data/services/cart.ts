import { HttpClient } from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import { GuestService } from './guest';
import {ProfileService} from "./profile";
import {environment} from "../../../environments/environment";

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
  constructor(
    private http: HttpClient,
    private guest: GuestService
  ) {}
  me = this.profileService.me();

  sendCart(cartData: any) {
    console.log('met')

    console.log(this.me)
    this.profileService.getMe().subscribe(data => {
      console.log('subscribe');
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
    })

  }

  ngOnInit() {
    this.profileService.getMe()
  }
}
