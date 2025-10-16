import { Component } from '@angular/core';
import { products } from '../../data/products';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-products-page',
  imports: [
    RouterLink
  ],
  templateUrl: './products-page.html',
  styleUrl: './products-page.scss'
})
export class ProductsPage {

  products = products;

}

