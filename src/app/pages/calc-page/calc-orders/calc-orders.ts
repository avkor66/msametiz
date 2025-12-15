import {Component, inject, signal} from '@angular/core';
import {AsyncPipe, DatePipe} from "@angular/common";
import {Popover} from "../../../admin-panel/components/admin-dashboard/admin-dashboard-suppliers/popover/popover";
import {IOrderForProfile, IOrders} from "../../../data/interfaces/product.interface";
import {ProfileService} from "../../../data/services/profile";
import {GuestService} from "../../../data/services/guest";

@Component({
  selector: 'app-calc-orders',
  imports: [
    DatePipe,
    Popover
  ],
  templateUrl: './calc-orders.html',
  styleUrl: './calc-orders.scss'
})
export class CalcOrders {
  guest = inject(GuestService)
  data: IOrderForProfile[] = [];
  guestMe = signal<string>(this.guest.getGuestId())

  profileService = inject(ProfileService);
  loadOrders() {
    this.profileService.loadUserOrdersByGuestId(this.guestMe()).subscribe(
      result => {
        console.log(result);
        this.data = result;
      }
    )
  }

  ngOnInit() {
    this.loadOrders()
  }
}
