import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Auth} from "../../../auth/auth";
import {ShoppingCart} from "../../../product-ui/shopping-cart/shopping-cart";
import {ProductList} from "../../../product-ui/product-list/product-list";

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss'
  })
export class AdminDashboard {
  private authService = inject(Auth);

  get currentUser() {
    return this.authService.getCurrentUser();
  }
  ngOnInit() {
    console.log('Initializing admin dashboard');
    console.log(this.authService.getCurrentUser())
  }
}

