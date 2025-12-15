import {Component, inject, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {Popover} from "../../admin-panel/components/admin-dashboard/admin-dashboard-suppliers/popover/popover";
import {IOrderForProfile, IOrders} from "../../data/interfaces/product.interface";
import {AdminService} from "../../data/services/admin";
import {ProfileService} from "../../data/services/profile";
import {Auth} from "../../auth/auth";
import {logMessages} from "@angular/build/src/tools/esbuild/utils";
import {Profile} from "../../data/interfaces/profile.interface";

@Component({
  selector: 'app-orders-page',
  imports: [
    DatePipe
  ],
  templateUrl: './orders-page.html',
  styleUrl: './orders-page.scss'
})

export class OrdersPage implements OnInit {
  data: IOrderForProfile[] = [];
  profileService = inject(ProfileService);
  constructor() {}
  me = this.profileService.me;
  meAccount: Profile | undefined = undefined;

  loadOrders() {
    this.profileService.getMe().subscribe(data => {
      console.log(data);
      this.meAccount = data;
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
