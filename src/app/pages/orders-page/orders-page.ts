import {Component, inject, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {Popover} from "../../admin-panel/components/admin-dashboard/admin-dashboard-suppliers/popover/popover";
import {IOrders} from "../../data/interfaces/product.interface";
import {AdminService} from "../../data/services/admin";
import {ProfileService} from "../../data/services/profile";
import {Auth} from "../../auth/auth";
import {logMessages} from "@angular/build/src/tools/esbuild/utils";

@Component({
  selector: 'app-orders-page',
  imports: [
    DatePipe,
    Popover
  ],
  templateUrl: './orders-page.html',
  styleUrl: './orders-page.scss'
})

export class OrdersPage implements OnInit {
  data: IOrders[] = [];
  profileService = inject(ProfileService);
  constructor() {}
  me = this.profileService.me;

  loadOrders() {
    this.profileService.getMe().subscribe(data => {
      this.profileService.loadUserOrders(data.email).subscribe(
        result => {
          console.log(result);
          this.data = result;
        }
      )

    })
  }

  ngOnInit() {

    this.loadOrders()
  }
}
