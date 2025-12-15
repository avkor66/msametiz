import {Component, OnInit} from '@angular/core';
import {IOrderForProfile, IOrders} from "../../../../data/interfaces/product.interface";
import {AdminService} from "../../../../data/services/admin";
import {Popover} from "../admin-dashboard-suppliers/popover/popover";
import {DatePipe} from "@angular/common";
import {Profile} from "../../../../data/interfaces/profile.interface";

@Component({
  selector: 'app-admin-dashboard-orders',
  imports: [
    Popover,
    DatePipe
  ],
  templateUrl: './admin-dashboard-orders.html',
  styleUrl: './admin-dashboard-orders.scss'
})
export class AdminDashboardOrders implements OnInit {
  data: {orders: IOrderForProfile[], carts: Profile[]} = {
    orders: [],
    carts: []
  };
  constructor(private adminService: AdminService) { }

  loadOrders() {
    this.adminService.getOrdersFromApplications().subscribe(
      result => {
        console.log(result);
        this.data.orders = result.orders;
        this.data.carts = result.carts;
      }
    )
  }

  ngOnInit() {
    this.loadOrders()
  }
}
