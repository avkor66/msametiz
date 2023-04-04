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
  selector: 'app-left-right',
  templateUrl: './left-right.component.html',
  styleUrls: ['./left-right.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
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
export class LeftRightComponent {

  

}
