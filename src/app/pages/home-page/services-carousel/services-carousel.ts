import {AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Input, ViewChild} from '@angular/core';
import { register } from 'swiper/element/bundle';
import { Swiper } from 'swiper/types';
import {JsonPipe} from '@angular/common';

register();

@Component({
  selector: 'app-services-carousel',
  templateUrl: './services-carousel.html',
  styleUrl: './services-carousel.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [
    JsonPipe
  ]
})

export class ServicesCarousel {
  @Input() photos! : {url: string, label: string}[];
  @Input() header!: string;
}


