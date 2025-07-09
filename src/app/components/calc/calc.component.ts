import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICart } from 'src/app/models/product'

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.scss']
})
export class CalcComponent implements OnInit {
  cart: ICart[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<ICart[]>('http://localhost:8080/api/v1/cart')
      .subscribe(data => {
        this.cart = data;
        console.log(data);
      })
    }

// // Получить элемент контейнера
//   var btnContainer = document.getElementById("myDIV");
//
// // Сделать все кнопки с class="btn" внутри контейнера
//   var btns = btnContainer.getElementsByClassName("btn");
//
// // Выполните цикл по кнопкам и добавьте активный класс к текущей кнопке
//   for (var i = 0; i < btns.length; i++) {
//   btns[i].addEventListener("click", function() {
//     var current = document.getElementsByClassName("active");
//     current[0].className = current[0].className.replace(" active", "");
//     this.className += " active";
//   });
// }

}
