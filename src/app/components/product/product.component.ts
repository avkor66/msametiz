import { Component, Input } from '@angular/core'
import { IProduct } from 'src/app/models/product'
import {products as data} from '../../../assets/data/component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['product.component.scss']
})


export class ProductComponent {

  products: IProduct[] = data;  
  // detail = false
}
