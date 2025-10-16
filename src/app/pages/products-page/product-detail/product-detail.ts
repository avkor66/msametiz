import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { products } from '../../../data/products';

@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss'
})
export class ProductDetail implements OnInit {
  product: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    this.product = products.find(p => p.name === name);
  }
}
