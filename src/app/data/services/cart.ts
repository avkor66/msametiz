import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GuestService } from './guest';

@Injectable({ providedIn: 'root' })
export class CartService {

  constructor(
    private http: HttpClient,
    private guest: GuestService
  ) {}

  sendCart(cartData: any) {
    const payload = {
      guestId: this.guest.getGuestId(),
      sessionId: this.guest.getSessionId(),
      device: this.guest.device,
      status: 'created',
      cart: {
        threadPitch: cartData.threadPitch,
        height: cartData.height,
        outerDiameter: cartData.outerDiameter,
        innerDiameter: cartData.innerDiameter,
        species: cartData.species,
        stateStandard: cartData.stateStandard,
        diameter: cartData.diameter,
        length: cartData.length,
        threadLength: cartData.threadLength,
        steelGrade: cartData.steelGrade,
        execution: cartData.execution,
        quantity: cartData.quantity,
        delivery: cartData.delivery,
        volume: cartData.volume,
        comment: cartData.comment
      },
      contact: {
        name: '',
        phone: '',
        email: ''
      },
      userMeta: {
        ip: '',
        userAgent: navigator.userAgent,
        referer: document.referrer || window.location.href,
        createdAt: new Date().toISOString()
      },
    };

    return this.http.post(`http://localhost:3000/api/cart`, payload, {
      withCredentials: true
    });
  }
}
