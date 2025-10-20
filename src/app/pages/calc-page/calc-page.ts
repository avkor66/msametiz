import {Component, computed} from '@angular/core';
import {ICart} from '../../data/interfaces/product.interface';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {DecimalPipe} from '@angular/common';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-calc-page',
  imports: [
    DecimalPipe,
    ReactiveFormsModule
  ],
  templateUrl: './calc-page.html',
  styleUrl: './calc-page.scss'
})
export class CalcPage {

  cart: ICart[] = [];



  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      category: ['metiz'],
      type: [''],
      subtype: [''],
      weight: [0],
      volume: [0],
      width: [0],
      height: [0],
      length: [0],
      quantity: [1],
      delivery: [false],
      comment: [''],
    });
  }

  form: FormGroup;

  // Список вариантов
  types = ['Болты', 'Гайки', 'Шайбы', 'Заклёпки'];
  subtypes = ['Оцинкованные', 'Нержавеющие', 'Латунные'];
  constructions = ['Каркас', 'Балка', 'Профиль', 'Опора'];

  // Переключение между "Метизы" / "Конструкции"
  setCategory(value: 'metiz' | 'construct') {
    this.form.patchValue({ category: value });
  }

  resetForm() {
    this.form.reset({
      category: 'metiz',
      quantity: 1,
      delivery: false,
    });
  }

  // Расчёт стоимости — примерная формула
  total = computed(() => {
    const f = this.form.value;
    const basePrice =
      f.category === 'metiz'
        ? (f.weight || 0) * 120 + (f.quantity || 0) * 15
        : (f.volume || 0) * 250 + (f.quantity || 0) * 30;

    return f.delivery ? basePrice * 1.1 : basePrice;
  });



  ngOnInit() {
    this.http.get<ICart[]>(environment.apiUrl + 'api/v1/cart')
      .subscribe(data => {
        this.cart = data;
        console.log(data);
      })
  }
}
