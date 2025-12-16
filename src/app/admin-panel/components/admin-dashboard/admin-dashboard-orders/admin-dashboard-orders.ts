import {Component, OnInit} from '@angular/core';
import {ICartsForAdmin, IOrderForProfile, IOrders} from "../../../../data/interfaces/product.interface";
import {AdminService} from "../../../../data/services/admin";
import {Popover} from "../admin-dashboard-suppliers/popover/popover";
import {AsyncPipe, CurrencyPipe, DatePipe, NgClass} from "@angular/common";
import {Profile} from "../../../../data/interfaces/profile.interface";
import {BehaviorSubject, Subject} from "rxjs";

@Component({
  selector: 'app-admin-dashboard-orders',
  imports: [
    Popover,
    DatePipe,
    AsyncPipe,
    CurrencyPipe,
    NgClass
  ],
  templateUrl: './admin-dashboard-orders.html',
  styleUrl: './admin-dashboard-orders.scss'
})
export class AdminDashboardOrders implements OnInit {
  data = new Subject<ICartsForAdmin[]>();

  constructor(private adminService: AdminService) { }

  loadOrders() {
    this.adminService.getOrdersFromApplications().subscribe(
      result => {
        console.log(result);
        this.data.next(result);
      }
    )
  }
  public activeCartId: string | null = null;

  heightTarget(event: Event) {
    const targetElement = event.currentTarget as HTMLElement;
    const elementId = targetElement.getAttribute('data-id');
    if (elementId) {
      if (this.activeCartId === elementId) {
        this.activeCartId = null;
      } else {
        this.activeCartId = elementId;
      }
    }
  }




  ngOnInit() {
    this.loadOrders()

  }

  ngAfterViewInit() {
    this.loadOrders();
  }
}
