import { HttpClient } from '@angular/common/http';
import {inject, Injectable, signal} from '@angular/core';
import { GuestService } from './guest';
import {ProfileService} from "./profile";
import {environment} from "../../../environments/environment";

export interface Order {
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
  threadPitch: number,
  spannerSize: number,
  weightKg: number,
  plateDimensions: string,
  anchorSpecifications: string
}
interface Payload {
  cart: Cart;
  orders: Order[];
}
interface Cart {
  guestId: string;
  sessionId: string;
  device: string;
  status: 'created';
  comment: string;
  files: string[];
  contact: {
    name: string;
    phone: string;
    email: string;
  };
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
  ) {

  }
  me = this.profileService.me();

  sendCart(cartData: any) {

    this.profileService.getMe().subscribe(
      {
        next: (data) => {
            console.log('subscribe with ME');
            const payload: Payload = {
              cart: {
                guestId: this.guest.getGuestId(),
                sessionId: this.guest.getSessionId(),
                device: this.guest.device,
                status: 'created',
                comment: '',
                files: [],
                contact: {
                  name: data.fullName,
                  phone: '',
                  email: data.email
                },
                userMeta: {
                  ip: '',
                  userAgent: navigator.userAgent,
                  referer: document.referrer || window.location.href,
                  createdAt: new Date().toISOString()
                },
              },
              orders: []
            };
            cartData.items.forEach((line: any) => {
              console.log("cartData = ");
              console.log(line);
              const cc: Order = {
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
                threadPitch: line.threadPitch,
                spannerSize: line.spannerSize,
                weightKg: line.weightKg,
                plateDimensions: line.plateDimensions,
                anchorSpecifications: line.anchorSpecifications,
              }
              payload.orders.push(cc);
            })
            console.log('payload');
            console.log(payload);

            this.http.post(`${environment.apiApplicationsUrl}cart/costs`, payload, {
              withCredentials: true
            }).subscribe()
        },
        error: (err) => {
          console.log('subscribe with error');
          const payload: Payload = {
            cart: {
              guestId: this.guest.getGuestId(),
              sessionId: this.guest.getSessionId(),
              device: this.guest.device,
              status: 'created',
              comment: '',
              files: [],
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
            },
            orders: []
          };
          cartData.items.forEach((line: any) => {
            console.log("cartData = ");
            console.log(line);
            const cc: Order = {
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
              threadPitch: line.threadPitch,
              spannerSize: line.spannerSize,
              weightKg: line.weightKg,
              plateDimensions: line.plateDimensions,
              anchorSpecifications: line.anchorSpecifications,
            }
            payload.orders.push(cc);
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
