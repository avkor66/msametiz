import { Component } from '@angular/core';
import { IProduct } from './models/product';
import { products as data } from '../assets/data/component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'msametiz96';

  products: IProduct[] = data;
}
