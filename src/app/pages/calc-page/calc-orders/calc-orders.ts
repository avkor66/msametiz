import {Component, inject} from '@angular/core';
import {DatePipe} from "@angular/common";
import {Popover} from "../../../admin-panel/components/admin-dashboard/admin-dashboard-suppliers/popover/popover";
import {IOrders} from "../../../data/interfaces/product.interface";
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
  data: IOrders[] = [];

  profileService = inject(ProfileService);
  loadOrders() {
    this.profileService.loadUserOrdersByGuestId(this.guest.getGuestId()).subscribe(
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
