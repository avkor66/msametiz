import {Component, OnInit} from '@angular/core';
import {IOrders} from "../../../../data/interfaces/product.interface";
import {AdminService} from "../../../../data/services/admin";
import {Popover} from "../admin-dashboard-suppliers/popover/popover";
import {DatePipe} from "@angular/common";

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
  data: IOrders[] = [];
  constructor(private adminService: AdminService) { }

  loadOrders() {
    this.adminService.getOrdersFromApplications().subscribe(
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
