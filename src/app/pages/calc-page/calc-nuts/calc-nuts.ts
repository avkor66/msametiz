import {SelectOption} from "../select-option/select-option";
import {Component, computed, inject, Input, OnInit} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
// Предполагается, что эти данные доступны через CalcService или как константы
import {CalcService, nutsByGost, studsByGost, washersByGost} from "../../../data/services/calc";
import {ICart} from "../../../data/interfaces/product.interface";
import {distinctUntilChanged, map, Observable, of, startWith, tap} from "rxjs";
import {GuestService} from "../../../data/services/guest";
// import {CartService} from "../../../data/services/cart";
import {products} from "../../../data/products";
import { Store, select } from '@ngrx/store';
import * as CartActions from '../../../cart/cart.actions';
// import { CartState } from '../../../cart/cart.reducer';
import { selectCartTotalItems } from '../../../cart/cart.selectors';
import {Product} from "../../../products/product.model"; // Импорт селектора

@Component({
  selector: 'app-calc-nuts',
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    SelectOption
  ],
  templateUrl: './calc-nuts.html',
  styleUrl: './calc-nuts.scss'
})
export class CalcNuts implements OnInit {

  // private store = inject(Store)
  @Input() calcService = CalcService;
  form: FormGroup;

  // Объект ICart, species фиксирован как 'washer'
  cart = {
    species: 'nut', // <-- Фиксированный вид
    stateStandard: '',
    diameter: '',
    steelGrade: '',
    quantity: undefined,
  }

  // Статические (или заглушки) данные, используем только шайбы
  temp: {
    gost: Record<'nut', string[]>,
    diameter: string[],
    steelGrades: string[],
  } = {
    gost: {
      nut: ['ГОСТ 5915-70', 'ГОСТ 9064-75-А', 'ГОСТ 9064-75-Б', 'ГОСТ 5927-70']
    },
    diameter: ['M12', 'M14', 'M16', 'M18', 'M20', 'M22', 'M24', 'M30'],
    steelGrades: ['ст.3', '20', '25', '35', '40Х', '09Г2С', '20Х13']
  };

  // Observable для опций
  availableStateStandards$: Observable<string[]>;
  availableDiameters$: Observable<string[]>;
  availableSteelGrades$: Observable<string[]>;

  // Observable для общего количества товаров в корзине
  cartTotalItems$: Observable<number>;

  // Опции ГОСТ доступны сразу
  stateStandardOptions: string[] = this.temp.gost.nut;

  nutImageUrl: string = 'assets/products/gayka.png';
  constructor(
    private fb: FormBuilder,
    private guestService: GuestService,
    // private cartService: CartService,
    private store: Store,
  ) {
    this.form = this.fb.group({
      // Фиксированные значения
      category: ['metiz'],
      species: ['nut'],
      execution: ['1'],

      // Выбираемые поля
      stateStandard: [null, [Validators.required]], // Обязательное поле
      diameter: [null, [Validators.required]],      // Обязательное поле
      steelGrade: [null, [Validators.required]],    // Обязательное поле
      quantity: [1, [Validators.required, Validators.min(1)]], // Обязательное, минимум 1
      delivery: [false],
      comment: [''],


    });

    // Инициализация Observable (ГОСТы доступны сразу)
    this.availableStateStandards$ = of(this.stateStandardOptions);
    this.availableDiameters$ = of([]);
    this.availableSteelGrades$ = of(this.temp.steelGrades); // Устанавливаем все стали по умолчанию

    // Инициализация Observable корзины
    this.cartTotalItems$ = this.store.pipe(select(selectCartTotalItems));
  }


  ngOnInit() {

    // ----------------------------------------------------------------------
    // ЦЕПОЧКА 1: ГОСТ (stateStandard) -> Диаметр (diameter) И Сталь (steelGrade)
    // ----------------------------------------------------------------------
    this.form.get('stateStandard')!.valueChanges.pipe(
      startWith(this.form.value.stateStandard),
      distinctUntilChanged(),
      tap((gost: string) => {
        this.form.get('diameter')!.setValue(null, {emitEvent: false});
        this.form.get('steelGrade')!.setValue(null, {emitEvent: false});
        this.cart.stateStandard = gost;
        this.updateWasherImage(gost);
        // 1. Обновляем список доступных марок стали
        this.updateSteelGrades(gost);
      }),
      map((gost: string) => {
        if (!gost || !nutsByGost[gost]) return [];

        // 2. Определяем доступные диаметры по ГОСТу
        const data = nutsByGost[gost];
        if (data && data.sizes) {
          return Object.keys(data.sizes);
        }

        return this.temp.diameter; // Дефолтное значение или заглушка
      })
    ).subscribe(diameters => this.availableDiameters$ = of(diameters));

    // ----------------------------------------------------------------------
    // ЦЕПОЧКА 2: Диаметр (diameter) -> Обновление параметров в Cart
    // ----------------------------------------------------------------------
    this.form.get('diameter')!.valueChanges.pipe(
      startWith(this.form.value.diameter),
      distinctUntilChanged(),
      tap((diameter: string) => {
        this.cart.diameter = diameter;

        // 3. Обновляем дополнительные параметры шайбы (d, D, t)
        this.updateCartParams(this.form.value.stateStandard, diameter);
      })
    ).subscribe();
  }

  // Вспомогательный метод для обновления марок стали
  private updateSteelGrades(gost: string): void {
    let grades: string[] = [];

    if (nutsByGost[gost]) {
      grades = nutsByGost[gost].steelGrades;
    }

    this.availableSteelGrades$ = of(grades);
  }

  // Вспомогательный метод для обновления доп. параметров в cart (для шайб: t, D, d)
  private updateCartParams(gost: string, diameter: string): void {
    if (nutsByGost[gost]?.sizes[diameter]) {
      const sizeData = nutsByGost[gost].sizes[diameter];


      // Mock calculation for volume based on selection
      // В реальном приложении здесь будет вызов CalcService
    } else {
      // Сброс
      this.form.patchValue({ volume: 0 }, { emitEvent: false });
    }
  }

  // Мок-функция для расчета объема (для демонстрации)
  private mockCalculateVolume(D: number, d: number, t: number): number {
    const pi = Math.PI;
    // Объем кольца = Pi * (R^2 - r^2) * h (где R=D/2, r=d/2, h=t)
    return Math.round(pi * (Math.pow(D / 2, 2) - Math.pow(d / 2, 2)) * t / 1000 * 100) / 100; // Мок-расчет
  }


  resetForm() {
    this.form.reset({
      species: 'nut',
      category: 'metiz',
      execution: '1',
      quantity: 1,
      delivery: false,
      volume: 0,
    }, { emitEvent: true });
    console.log(this.availableStateStandards$)
    // Очистка объекта cart
    this.cart = { ...this.cart, stateStandard: '', diameter: '', steelGrade: ''};
    this.availableDiameters$ = of([]);
    this.availableSteelGrades$ = of(this.temp.steelGrades);
  }

  // Расчёт стоимости
  total = computed(() => {
    const f = this.form.getRawValue();
    const basePrice = (f.volume || 0) * 120 + (f.quantity || 0) * 15;

    return f.delivery ? basePrice * 1.1 : basePrice;
  });





  // НОВЫЙ МЕТОД: Обновление изображения в зависимости от ГОСТа
  private updateWasherImage(gost: string): void {
    let url: string;
    switch (gost) {
      case 'ГОСТ 5915-70': // Гост 5915-70
        // Пример URL для ГОСТ 9065-75 (Шайба косая)
        url = '/assets/products/gayka.jpg';
        break;
      case 'ГОСТ 9064-75-А': // Гост 9064-75
        // Пример URL для ГОСТ 11371-78 (Шайба плоская)
        url = '/assets/products/gayka.png';
        break;
      case 'ГОСТ 9064-75-Б': // Гост 9064-75
        // Пример URL для ГОСТ 11371-78 (Шайба плоская)
        url = '/assets/products/gayka.png';
        break;
      case 'ГОСТ 5927-70': // Гост 9064-75
        // Пример URL для ГОСТ 11371-78 (Шайба плоская)
        url = '/assets/products/gayka.png';
        break;
      default:
        // URL по умолчанию, если ГОСТ не выбран или не поддерживается
        url = '/assets/products/gayka.png';
        break;
    }
    this.nutImageUrl = url;
  }


  // НОВЫЙ МЕТОД: Добавление сконфигурированного продукта в NgRx Store
  addToCart() {
    this.form.markAllAsTouched();

    if (!this.form.valid) {
      console.error('Нельзя добавить в корзину: не все обязательные поля заполнены.');
      return;
    }

    const formData = this.form.getRawValue();

    // 1. ГЕНЕРАЦИЯ СУЩЕСТВУЮЩЕГО ID:
    // Мы используем данные из формы (species, stateStandard, diameter, steelGrade)
    // для создания ID, который уже есть в базе.
    // Обратите внимание: в вашем JSON-примере нет `length` и `threadLength` в ID,
    // поэтому я их исключил для точного совпадения.
    const uniqueId: string = `metiz-${formData.species}-${formData.stateStandard}-${formData.diameter}-${formData.steelGrade}`;

    // 2. ПОЛУЧЕНИЕ КОЛИЧЕСТВА:
    const quantity: number = formData.quantity;

    // 3. ПРОВЕРКА НАЛИЧИЯ ПРОДУКТА (опционально, но полезно)
    // Желательно сначала проверить, что продукт с таким ID действительно существует в Product Store.
    // (Этот шаг требует асинхронного "выбора" данных из Product Store, что я сейчас опущу для простоты,
    // но это хорошая практика).

    // 4. ДИСПАТЧ: Используем СТАНДАРТНОЕ действие для добавления в корзину.
    // Используйте действие, которое принимает только ID и количество.
    // Например: CartActions.addItem({ itemId: uniqueId, quantity: quantity })
    this.store.dispatch(CartActions.addItem({
      productId: uniqueId,
      quantity: quantity
    }));

    console.log(`ID продукта ${uniqueId} и количество ${quantity} отправлены в Cart Store.`);
  }

  // УДАЛЕННЫЙ МЕТОД: старый onSubmit, замененный на addToCart
  onSubmit() {
    console.log(this.cartTotalItems$)
    // Вместо старой логики отправки через CartService,
    // вызываем новую логику добавления в NgRx Store
    this.addToCart();
  }

  //
  //
  // protected readonly products = products;
  protected readonly products = products;
}