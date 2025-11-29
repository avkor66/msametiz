import {Component, computed, Input, OnInit} from '@angular/core';
import {CalcService, nutsByGost, boltsByGost, washersByGost} from "../../../data/services/calc";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ICart} from "../../../data/interfaces/product.interface";
import {distinctUntilChanged, map, Observable, of, startWith, tap} from "rxjs";
import {GuestService} from "../../../data/services/guest";
import {CartService} from "../../../data/services/cart";
import {AsyncPipe} from "@angular/common";
import {SelectOption} from "../select-option/select-option";
import {select, Store} from "@ngrx/store";
import {selectCartTotalItems} from "../../../cart/cart.selectors";
import * as CartActions from "../../../cart/cart.actions";
import {generateAndSaveAllProducts} from "../../../data/ddd";

@Component({
  selector: 'app-calc-bolts',
  imports: [ReactiveFormsModule, AsyncPipe, SelectOption],
  templateUrl: './calc-bolts.html',
  styleUrl: './calc-bolts.scss'
})

export class CalcBolts implements OnInit {

  // private store = inject(Store)
  @Input() calcService = CalcService;
  form: FormGroup;

  // Объект ICart, species фиксирован как 'washer'
  cart = {
    species: 'bolt', // <-- Фиксированный вид
    stateStandard: '',
    diameter: '',
    steelGrade: '',
    length: '',
    quantity: undefined,
  }

  // Статические (или заглушки) данные, используем только шайбы
  temp: {
    gost: Record<'bolt', string[]>,
    diameter: string[],
    steelGrades: string[],
  } = {
    gost: {
      bolt: ['ГОСТ 7805-70', 'ГОСТ 7798-70']
    },
    diameter: ['M12', 'M14', 'M16', 'M18', 'M20', 'M22', 'M24', 'M30'],
    steelGrades: ['ст.3', '20', '25', '35', '40Х', '09Г2С', '20Х13']
  };

  // Observable для опций
  availableStateStandards$: Observable<string[]>;
  availableDiameters$: Observable<string[]>;
  availableSteelGrades$: Observable<string[]>;
  availableLength$: Observable<string[]>;


  // Observable для общего количества товаров в корзине
  cartTotalItems$: Observable<number>;

  // Опции ГОСТ доступны сразу
  stateStandardOptions: string[] = this.temp.gost.bolt;

  boltImageUrl: string = 'assets/products/bolt.png';
  constructor(
    private fb: FormBuilder,
    private guestService: GuestService,
    // private cartService: CartService,
    private store: Store,
  ) {
    this.form = this.fb.group({
      // Фиксированные значения
      category: ['metiz'],
      species: ['bolt'],
      execution: ['1'],

      // Выбираемые поля
      length: [null, [Validators.required]],
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
    this.availableLength$ = of([]);

    // Инициализация Observable корзины
    this.cartTotalItems$ = this.store.pipe(select(selectCartTotalItems));
  }

  // Предполагаем, что объект boltsByGost уже импортирован.
// M12_DATA = boltsByGost['ГОСТ 7798-70'].sizes['M12'];
// STEEL_GRADES = boltsByGost['ГОСТ 7798-70'].steelGrades;
//
//   generateM12Products(gostData: any, diameterKey: string) {
//     const products = [];
//     const standard = 'ГОСТ 7798-70';
//     const sizeSpec = gostData.sizes[diameterKey];
//     const steelGrades = gostData.steelGrades;
//     const [minL, maxL] = sizeSpec.range;
//     const { step, P, S, k } = sizeSpec;
//
//     const getStrengthClass = (steelGrade: string) => {
//       // Пример упрощенного определения класса прочности
//       if (['Ст3', '10', '20'].includes(steelGrade)) return '5.8';
//       if (['35', '40', '35Г2', '20Г2Р'].includes(steelGrade)) return '8.8';
//       if (['35Х', '40Х', '38ХА'].includes(steelGrade)) return '10.9';
//       if (['30Х3МФ', '40ХН2МА'].includes(steelGrade)) return '12.9';
//       return '';
//     };
//
//     for (const steelGrade of steelGrades) {
//       for (let length = minL; length <= maxL; length += step) {
//         const strengthClass = getStrengthClass(steelGrade);
//         const id = `metiz-bolt-${standard}-${diameterKey}-${steelGrade}-L${length}`;
//         const name = `Болт ${diameterKey}x${length} ${standard}`;
//         const description = `Болт ${strengthClass ? `класса прочности ${strengthClass}` : ''}. Класс точности В. Сталь ${steelGrade}.`;
//
//         products.push({
//           "id": id,
//           "name": name,
//           "description": description,
//           "price": 0.0,
//           "imageUrl": "assets/products/bolt.png",
//           "stateStandard": standard,
//           "diameter": diameterKey,
//           "steelGrade": steelGrade,
//           "height": k,
//           "outerDiameter": 0,
//           "innerDiameter": 0,
//           "species": "болт",
//           "length": `${length}mm`,
//           "threadLength": "",
//           "threadPitch": P,
//           "spannerSize": S,
//           "weightKg": 0,
//           "plateDimensions": "",
//           "anchorSpecifications": ""
//         });
//       }
//     }
//     return products;
//   }


  ngOnInit() {
  // const M12_FULL_LIST = this.generateM12Products(boltsByGost['ГОСТ 7798-70'], 'M12');
  // console.log(M12_FULL_LIST); // Вывод: 247
    generateAndSaveAllProducts('ГОСТ 7798-70');
    // ----------------------------------------------------------------------
    // ЦЕПОЧКА 1: ГОСТ (stateStandard) -> Диаметр (diameter) И Сталь (steelGrade)
    // ----------------------------------------------------------------------
    this.form.get('stateStandard')!.valueChanges.pipe(
      startWith(this.form.value.stateStandard),
      distinctUntilChanged(),
      tap((gost: string) => {
        this.form.get('diameter')!.setValue(null, {emitEvent: false});
        this.form.get('steelGrade')!.setValue(null, {emitEvent: false});
        this.form.get('length')!.setValue(null, {emitEvent: false});
        this.cart.stateStandard = gost;
        this.updateBoltImage(gost);
        // 1. Обновляем список доступных марок стали
        this.updateSteelGrades(gost);
      }),
      map((gost: string) => {
        if (!gost || !this.calcService.getAvailableBoltDiameter(gost)) return [];

        // 2. Определяем доступные диаметры по ГОСТу
        const data = boltsByGost[gost];
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
        this.updateLength(this.form.value.stateStandard, diameter)
      })
    ).subscribe();

    this.form.get('length')!.valueChanges.pipe(
      startWith(this.form.value.length),
      distinctUntilChanged(),
      tap((length: string) => {
        this.cart.length = length;
        // 3. Обновляем дополнительные параметры шайбы (d, D, t)
      })
    ).subscribe();
  }

  // Вспомогательный метод для обновления марок стали
  private updateSteelGrades(gost: string): void {
    let grades: string[] = [];

    if (boltsByGost[gost]) {
      grades = boltsByGost[gost].steelGrades;
    }
    this.availableSteelGrades$ = of(grades);
  }

  // Вспомогательный метод для обновления длины болтов
  private updateLength(gost: string, diameter: string): void {
    let lengths: string[] = [];

    if (boltsByGost[gost]) {
      lengths = CalcService.getAvailableBoltLengths(gost, diameter);
    }
    this.availableLength$ = of(lengths);
  }

  // Вспомогательный метод для обновления доп. параметров в cart (для шайб: t, D, d)
  private updateCartParams(gost: string, diameter: string): void {
    if (boltsByGost[gost]?.sizes[diameter]) {
      const sizeData = boltsByGost[gost].sizes[diameter];


      // Mock calculation for volume based on selection
      // В реальном приложении здесь будет вызов CalcService
    } else {
      // Сброс
      this.form.patchValue({ volume: 0 }, { emitEvent: false });
    }
  }



  resetForm() {
    this.form.reset({
      species: 'bolt',
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
  private updateBoltImage(gost: string): void {
    let url: string;
    switch (gost) {
      case 'ГОСТ 7805-70': // Гост 5915-70
        // Пример URL для ГОСТ 9065-75 (Шайба косая)
        url = '/assets/products/bolt.png';
        break;
      case 'ГОСТ 7798-70': // Гост 9064-75
        // Пример URL для ГОСТ 11371-78 (Шайба плоская)
        url = '/assets/products/bolt.png';
        break;
      default:
        // URL по умолчанию, если ГОСТ не выбран или не поддерживается
        url = '/assets/products/bolt.png';
        break;
    }
    this.boltImageUrl = url;
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
    const uniqueId: string = `metiz-${formData.species}-${formData.stateStandard}-${formData.diameter}-${formData.steelGrade}-L${formData.length}`;



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

}