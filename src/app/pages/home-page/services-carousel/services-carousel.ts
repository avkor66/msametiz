import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-services-carousel',
  templateUrl: './services-carousel.html',
  styleUrl: './services-carousel.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: []
})

export class ServicesCarousel {
  @Input() photos!: {url: string, label: string}[];
  @Input() header!: string;
  @Input() color!: string;
}


