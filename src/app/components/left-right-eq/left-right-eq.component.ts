import { Component, ViewEncapsulation } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination]);

@Component({
  selector: 'app-left-right-eq',
  templateUrl: './left-right-eq.component.html',
  styleUrls: ['./left-right-eq.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [

    trigger('leftRight', [
      state('left', style({
        left: '0px',
      })), 
      state('right', style({
        left: '-1400px',
      })),
      state('middle', style({
        left: '1400px',
      })),
      transition('middle <=> right, left <=> middle, left <=> right', [
        animate('1s')
      ]),
    ])

  ]
})
export class LeftRightEqComponent {

  isOpen = true;
  isLeft = false
  isRight = false
  toggle() {
    this.isOpen = !this.isOpen;
  }
  left() {
    this.isLeft = true;
    this.isRight = false;
  }
  right() {
    this.isLeft = false;
    this.isRight = true;
  }
  

}
