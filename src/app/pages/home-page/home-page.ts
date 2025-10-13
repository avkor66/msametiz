import { Component } from '@angular/core';
import {ServicesCarousel} from './services-carousel/services-carousel';

@Component({
  selector: 'app-home-page',
  imports: [
    ServicesCarousel
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePage {
  // obj = {
  //   tk_jde: '../../../assets/data/images/tk_logo/jde.svg',
  //   tk_baikalsr: '../../../assets/data/images/tk_logo/baikalsr.svg',
  //   tk_dellin: '../../../assets/data/images/tk_logo/dellin.png',
  //   tk_express: '../../../assets/data/images/tk_logo/express-auto.png',
  //   tk_kit: '../../../assets/data/images/tk_logo/kit.svg',
  // }

  photosServices = [
    {url: '/assets/images/photos/tokar_1.jpeg', label: 'Токарные работы'},
    {url: '/assets/images/photos/raspil_1.jpeg', label: 'Распил'},
    {url: '/assets/images/photos/svarka_3.jpeg', label: 'Сварка'},
    {url: '/assets/images/photos/cinol.jpeg', label: 'Покраска'},
    {url: '/assets/images/photos/cinotan.jpeg', label: 'Грунтовка'},
    {url: '/assets/images/photos/frezer_1.jpeg', label: 'Фрезерование'},
    {url: '/assets/images/photos/gibka_1.jpeg', label: 'Гибка'},
    {url: '/assets/images/photos/rezka_2.jpeg', label: 'Резка'},
    {url: '/assets/images/photos/rubka_1.jpeg', label: 'Рубка'},
    {url: '/assets/images/photos/termoobrabotka.jpeg', label: 'Термообработка'},
    {url: '/assets/images/photos/valcovka_1.jpeg', label: 'Вальцовка'},
    {url: '/assets/images/photos/cinkovanie_1.jpeg', label: 'Цинкование'}
  ];

  photosProducts = [
    {url: '/assets/images/prod/001.jpg', label: 'Закладные детали'},
    {url: '/assets/images/prod/002.jpg', label: 'Мусорные баки'},
    {url: '/assets/images/prod/003.jpg', label: 'Закладные детали'},
    {url: '/assets/images/prod/004.jpg', label: 'Шпильки'},
    {url: '/assets/images/prod/005.jpg', label: 'Болты БСР'},
    {url: '/assets/images/prod/006.jpg', label: 'Закладные детали'},
    {url: '/assets/images/prod/007.jpg', label: 'Гайки'},
    {url: '/assets/images/prod/008.jpg', label: ''},
    {url: '/assets/images/prod/009.jpg', label: 'Закладные детали'},
    {url: '/assets/images/prod/010.jpg', label: ''},
    {url: '/assets/images/prod/011.jpg', label: 'Болты'},
    {url: '/assets/images/prod/012.jpg', label: ''},
    {url: '/assets/images/prod/013.jpg', label: 'Болты'},
    {url: '/assets/images/prod/014.jpg', label: ''},
    {url: '/assets/images/prod/015.jpg', label: 'Пластины'},
    {url: '/assets/images/prod/017.jpg', label: ''},
    {url: '/assets/images/prod/018.jpg', label: 'Фундаментные болты'},
  ];

  headerService = "Услуги"
  headerProduct = "Продукция"
}
