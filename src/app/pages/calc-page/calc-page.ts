import {Component, computed, Input, OnInit} from '@angular/core';
import {ICart} from '../../data/interfaces/product.interface';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {SelectOption} from './select-option/select-option';
import {CalcService, nutsByGost, studsByGost, washersByGost} from '../../data/services/calc';
import {CartService} from '../../data/services/cart';
import {GuestService} from '../../data/services/guest';
import {distinctUntilChanged, map, Observable, of, startWith, switchMap, tap} from "rxjs";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-calc-page',
  imports: [
    ReactiveFormsModule,
    SelectOption,
    AsyncPipe
  ],
  templateUrl: './calc-page.html',
  styleUrl: './calc-page.scss'
})

export class CalcPage implements OnInit {
  @Input() calcService = CalcService;
  form: FormGroup;

  cart: ICart = {
    threadPitch: undefined,
    height: undefined,
    outerDiameter: undefined,
    innerDiameter: undefined,
    species: '',
    stateStandard: '',
    stateStandards: [''],
    diameter: '',
    diameters: [''],
    length: '',
    lengths: [''],
    threadLength: '',
    threadLengths: [''],
    steelGrade: '',
    steelGrades: [''],
    execution: '',
    quantity: undefined,
    delivery: false,
    volume: 0,
    comment: ''
  }

  temp: {
    gost: Record<'bolt' | 'screw' | 'washer' | 'hairpin', string[]>,
    diameter: string[],
    length: string[],
    threadLength: string[],
    steelGrades: string[],
  } = {
    gost: {
      bolt: ['ГОСТ 7798-70', 'ГОСТ 24379.1-2012', 'ГОСТ 28778-90'],
      screw: ['ГОСТ 5915-70', 'ГОСТ 9064-75'],
      washer: ['ГОСТ 9065-75', 'ГОСТ 11371-78'],
      hairpin: ['ГОСТ 9066-75', 'ГОСТ 22032-76']
    },
    diameter: ['M12', 'M14', 'M16', 'M18', 'M20', 'M22', 'M24', 'M30', 'M34', 'M36', 'M42', 'M48', 'M56', 'M64', 'M72'],
    length: ['20мм', '40мм', '60мм', '80мм', '100мм'],
    threadLength: ['10мм', '20мм', '40мм', '60мм', '100мм'],
    steelGrades: ['ст.3', '20', '25', '35', '40Х', '09Г2С', '20Х13']
  };

  // Типы опций для отображения в шаблоне
  availableStateStandards$: Observable<string[]>;
  availableDiameters$: Observable<string[]>;
  availableLengths$: Observable<string[]>;
  availableThreadLengths$: Observable<string[]>;
  availableSteelGrades$: Observable<string[]>;

  // Список вариантов
  category = [''];
  stateStandard = ['', '3390', '3320', '3321'];
  diameters = ['', 'M12', 'M14', 'M16', 'M18', 'M20', 'M22'];
  steelGrades = ['ст.3', '20', '25', '35', '40Х', '09Г2С', '20Х13']
  series = ['', 'ст3', 'м20', 'м40', 'м45']
  subspecies = ['', 'ст3', 'м20', 'м40', 'м45']
  length = ['', '10мм', '20мм', '40мм', '60мм', '100мм']
  threadLength = ['10мм', '20мм', '40мм', '60мм', '100мм']
  execution = ['1']

  species = [{value: 'bolt', label: 'Болты'}, {value: 'screw', label: 'Гайки'}, {
    value: 'washer',
    label: 'Шайбы'
  }, {value: 'hairpin', label: 'Шпильки'}];
  constructions = ['Каркас', 'Балка', 'Профиль'];
  details = ['Закладные', 'Опоры'];



  constructor(
    private fb: FormBuilder,
    private guestService: GuestService,
    private cartService: CartService,
  ) {
    this.form = this.fb.group({

      category: ['metiz'],
      species: [''],
      stateStandard: [''],
      diameter: [''],
      length: [''],
      threadLength: [''],
      series: [''],
      subspecies: [''],
      execution: ['1'],
      steelGrade: [''],
      quantity: [1],
      delivery: [false],
      volume: [0],
      comment: [''],
      threadPitch: undefined,
      height: undefined,
      outerDiameter: undefined,
      innerDiameter: undefined,

    });

    this.availableStateStandards$ = of([]);
    this.availableDiameters$ = of([]);
    this.availableLengths$ = of([]);
    this.availableThreadLengths$ = of([]);
    this.availableSteelGrades$ = of([]);
  }


  ngOnInit() {

    this.form?.get('category')?.valueChanges.pipe(
      distinctUntilChanged(),
      // Используем tap для вызова setCategory, но без emitEvent, чтобы избежать двойных циклов
      tap(() => this.setCategory(this.form?.value.category, false))
    ).subscribe()

// ----------------------------------------------------------------------
    // ЦЕПОЧКА 1: Вид (species) -> ГОСТ (stateStandard)
    // ----------------------------------------------------------------------
    // Зависимость: species (Вид) -> stateStandards (ГОСТы)
    this.availableStateStandards$ = this.form.get('species')!.valueChanges.pipe(
      startWith(this.form.value.species), // Начать с текущего значения
      distinctUntilChanged(), // Только если значение действительно изменилось
      tap((species: string) => {
        // ⚠️ ОЧИСТКА ДОЧЕРНИХ ПОЛЕЙ
        this.form.get('stateStandard')!.setValue(null, {emitEvent: false});
        this.form.get('diameter')!.setValue(null, {emitEvent: false});
        this.form.get('length')!.setValue(null, { emitEvent: false });
        this.form.get('threadLength')!.setValue(null, { emitEvent: false });
        this.form.get('steelGrade')!.setValue(null, { emitEvent: false });
        this.cart.species = species; // Обновляем cart для логики в шаблоне @if
      }),
      map((species: string) => {
        if (!species || species === 'null') return [];
        // Используем данные из temp.gost в зависимости от выбранного вида
        return this.temp.gost[species as keyof typeof this.temp.gost] || [];
      })
    );

// ----------------------------------------------------------------------
    // ЦЕПОЧКА 2: ГОСТ (stateStandard) -> Диаметр (diameter) И Сталь (steelGrade)
    // ----------------------------------------------------------------------
    this.availableDiameters$ = this.form.get('stateStandard')!.valueChanges.pipe(
      startWith(this.form.value.stateStandard),
      distinctUntilChanged(),
      tap((gost: string) => {
        // ⚠️ ОЧИСТКА ДОЧЕРНИХ ПОЛЕЙ
        this.form.get('diameter')!.setValue(null, {emitEvent: false});
        this.form.get('length')!.setValue(null, {emitEvent: false});
        this.form.get('threadLength')!.setValue(null, { emitEvent: false });
        this.cart.stateStandard = gost; // Обновляем cart
        // 5. Запуск логики обновления списка марок стали
        this.updateSteelGrades(this.form.value.species, gost);
      }),
      map((gost: string) => {
        const species = this.form.value.species;
        if (!gost || !species) return [];

// Логика определения доступных диаметров (симулируем данные)
        if (species === 'bolt') {
          // return this.calcService.getAvailableBoltDiameter(gost);
          return this.temp.diameter; // 👈 Заглушка
        }
        if ((species === 'screw' && nutsByGost[gost]) ||
          (species === 'washer' && washersByGost[gost]) ||
          (species === 'hairpin' && studsByGost[gost])) {

          const data = (species === 'screw' ? nutsByGost : species === 'washer' ? washersByGost : studsByGost);
          return Object.keys(data[gost].sizes);
        }

        return this.temp.diameter; // Дефолтное значение
      })
    );

    // ----------------------------------------------------------------------
    // ЦЕПОЧКА 3: Диаметр (diameter) -> Длина (length) И Длина резьбы (threadLength)
    // ----------------------------------------------------------------------
// Зависимость: diameter (Диаметр) -> length (Длина)
    this.availableLengths$ = this.form.get('diameter')!.valueChanges.pipe(
      startWith(this.form.value.diameter),
      distinctUntilChanged(),
      tap((diameter: string) => {
        this.form.get('length')!.setValue(null, {emitEvent: false});
        this.form.get('threadLength')!.setValue(null, {emitEvent: false});
        this.cart.diameter = diameter; // Обновляем cart

        this.updateCartParams(this.form.value.species, this.form.value.stateStandard, diameter);
      }),
      map((diameter: string) => {
        const gost = this.form.value.stateStandard;
        const species = this.form.value.species;

        if (!diameter || !gost || !species) {
          // Если диаметр сброшен, сбрасываем и резьбу
          this.availableThreadLengths$ = of([]);
          return [];
        }

        // Логика определения доступных длин
        if (species === 'bolt') {
          // return this.calcService.getAvailableBoltLengths(gost, diameter);
          return this.temp.length; // 👈 Заглушка
        }

        // Если это шпилька, также реактивно обновляем доступные длины резьбы
        if (species === 'hairpin' && studsByGost[gost]?.sizes[diameter]) {
          const lengths = studsByGost[gost].sizes[diameter].L.map(String);
          // 6. Реактивное обновление списка длин резьбы (специфично для шпилек)
          this.availableThreadLengths$ = of(this.temp.threadLength);
          return lengths;
        }

        // Логика для болтов
        this.availableThreadLengths$ = of([]); // Для других, где нет зависимости
        return this.temp.length; // Дефолтное значение
      })
    );

  }
// 4. Оставьте только чистые методы-помощники (удалите все on...Change)

  // Вспомогательный метод для обновления марок стали
  private updateSteelGrades(species: string, gost: string): void {
    let grades: string[] = this.temp.steelGrades;
    if (species === 'screw' && nutsByGost[gost]) {
      grades = nutsByGost[gost].steelGrades;
    } else if (species === 'washer' && washersByGost[gost]) {
      grades = washersByGost[gost].steelGrades;
    } else if (species === 'hairpin' && studsByGost[gost]) {
      grades = studsByGost[gost].steelGrades;
    }
    // Обновляем Observable для стали
    this.availableSteelGrades$ = of(grades);
  }

// Вспомогательный метод для обновления доп. параметров в cart (для отображения и отправки)
  private updateCartParams(species: string, gost: string, diameter: string): void {
    if (species === 'screw' && nutsByGost[gost]?.sizes[diameter]) {
      this.cart.height = nutsByGost[gost].sizes[diameter].m;
      this.cart.threadPitch = nutsByGost[gost].sizes[diameter].P;
    } else if (species === 'washer' && washersByGost[gost]?.sizes[diameter]) {
      this.cart.height = washersByGost[gost].sizes[diameter].t;
      this.cart.outerDiameter = washersByGost[gost].sizes[diameter].D;
      this.cart.innerDiameter = washersByGost[gost].sizes[diameter].d;
    } else {
      // Сброс или дефолтные значения
      this.cart.height = undefined;
      this.cart.threadPitch = undefined;
      this.cart.outerDiameter = undefined;
      this.cart.innerDiameter = undefined;
    }
  }

  // Переключение между "Метизы" / "Конструкции"
  setCategory(value: 'metiz' | 'construct' | 'detail', eminEvent: boolean = true) {
    // @ts-ignore
    this.form.reset({
      category: value,
      species: null,
      subtype: null,
      gost: null,
      weight: 0,
      volume: 0,
      width: 0,
      height: 0,
      series: null,
      length: null,
      diameter: null,
      steel: null,
      quantity: 1,
      threadLength: null,
      execution: 1,
      delivery: false,
      comment: '',
    }, { emitEvent: eminEvent });

    this.cart.species = ''
    this.cart.stateStandard = ''
    this.cart.stateStandards = ['']
    this.cart.diameter = ''
    this.cart.length = ''
    this.cart.threadLength = ''
    this.cart.steelGrade = ''
    this.cart.diameters = ['']
    this.cart.lengths = ['']
    this.cart.threadLengths = ['']
    this.cart.steelGrades = ['']
  }

  resetForm() {
    this.setCategory('metiz');
  }

  // Расчёт стоимости
  total = computed(() => {
    // Используем текущее значение формы
    const f = this.form.getRawValue();
    const basePrice =
      f.category === 'metiz'
        ? (f.volume || 0) * 120 + (f.quantity || 0) * 15 // Используем заглушку, так как веса нет в форме
        : (f.volume || 0) * 250 + (f.quantity || 0) * 30;

    return f.delivery ? basePrice * 1.1 : basePrice;
  });

  onSubmit() {
    this.cart.execution = this.form.value.execution
    this.cart.quantity = this.form.value.quantity
    this.cart.delivery = this.form.value.delivery
    this.cart.volume = this.form.value.volume
    this.cart.comment = this.form.value.comment

    // Логирование и отправка
    console.log('Отправка формы:', this.form.value);
    console.log('Объект корзины:', this.cart);

    this.cartService.sendCart(this.cart)
      .subscribe({
        next: res => console.log('Корзина отправлена', res),
        error: err => console.error('Ошибка', err)
      });
    console.log(this.form.value);
  }

}
