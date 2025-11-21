import {Component, computed, Input} from '@angular/core';
import {ICart} from '../../data/interfaces/product.interface';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {SelectOption} from './select-option/select-option';
import {CalcService, nutsByGost, studsByGost, washersByGost} from '../../data/services/calc';
import {CartService} from '../../data/services/cart';
import {GuestService} from '../../data/services/guest';

@Component({
  selector: 'app-calc-page',
  imports: [
    ReactiveFormsModule,
    SelectOption
  ],
  templateUrl: './calc-page.html',
  styleUrl: './calc-page.scss'
})

export class CalcPage {
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
    steelGrades: ['ст.3','20','25','35','40Х','09Г2С','20Х13']
  };

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
  }



  // Список вариантов
  category = [''];
  stateStandard = ['', '3390', '3320', '3321'];
  diameters = ['', 'M12', 'M14', 'M16', 'M18', 'M20', 'M22'];
  steelGrades = ['ст.3','20','25','35','40Х','09Г2С','20Х13']
  series = ['', 'ст3', 'м20', 'м40', 'м45']
  subspecies = ['', 'ст3', 'м20', 'м40', 'м45']
  length = ['', '10мм', '20мм', '40мм', '60мм', '100мм']
  threadLength = ['10мм', '20мм', '40мм', '60мм', '100мм']
  execution = ['1']

  species = [{value: 'bolt', label:'Болты'}, {value: 'screw', label:'Гайки'}, {value: 'washer', label:'Шайбы'}, {value: 'hairpin', label:'Шпильки'}];
  constructions = ['Каркас', 'Балка', 'Профиль'];
  details = ['Закладные', 'Опоры'];


  // Переключение между "Метизы" / "Конструкции"
  setCategory(value: 'metiz' | 'construct' | 'detail') {
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
    });

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
    this.form.reset({
      category: 'metiz',
      type: null,
      subtype: null,
      stateStandard: null,
      weight: 0,
      volume: 0,
      width: 0,
      height: 0,
      series: null,
      species: null,
      length: null,
      diameter: null,
      steel: null,
      quantity: 1,
      threadLength: null,
      execution: null,
      delivery: false,
      comment: '',
    });
  }

  // Расчёт стоимости — примерная формула
  // total = computed(() => {
  //   const f = this.form.value;
  //   const basePrice =
  //     f.category === 'metiz'
  //       ? (f.weight || 0) * 120 + (f.quantity || 0) * 15
  //       : (f.volume || 0) * 250 + (f.quantity || 0) * 30;
  //
  //   return f.delivery ? basePrice * 1.1 : basePrice;
  // });


  onSpeciesChange(event: Event) {

    const value = (event.target as HTMLSelectElement).value;
    this.cart.species = value;
    this.cart.stateStandards = this.temp.gost[value as keyof typeof this.temp.gost]

    console.log('Выбрано: ', value);
    console.log('Текущая корзина: ', this.cart);

    //CLEAR
    this.cart.stateStandard = ''
    this.cart.diameter = ''
    this.cart.diameters = ['']
    this.cart.length = ''
    this.cart.lengths = ['']
    this.cart.threadLength = ''
    this.cart.threadLengths = ['']
    this.cart.steelGrade = ''
    this.cart.steelGrades = ['']
  }

  onStateStandardChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.cart.stateStandard = value;
    this.cart.steelGrades = this.steelGrades;
    this.cart.steelGrade = ''
    if (this.cart.species === 'bolt') {
      this.cart.diameters = this.calcService.getAvailableBoltDiameter(value);
    }
    if (this.cart.species === 'screw') {
      this.cart.diameters = Object.keys(nutsByGost[value].sizes)
      this.cart.steelGrades = nutsByGost[value].steelGrades
    }
    if (this.cart.species === 'washer') {
      this.cart.diameters = Object.keys(washersByGost[value].sizes)
      this.cart.steelGrades = washersByGost[value].steelGrades
    }
    if (this.cart.species === 'hairpin') {
      this.cart.diameters = Object.keys(studsByGost[value].sizes)
      this.cart.steelGrades = studsByGost[value].steelGrades
    }

    console.log('Выбран ГОСТ: ', value);
    console.log('Текущая корзина: ', this.cart);

    //CLEAR
    this.cart.diameter = ''
    this.cart.length = ''
    this.cart.lengths = ['']
    this.cart.threadLength = ''
    this.cart.threadLengths = ['']

  }

  onDiameterChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.cart.diameter = value;
    if (this.cart.species === 'bolt') {
      this.cart.lengths = this.calcService.getAvailableBoltLengths(this.cart.stateStandard, value);
    }
    if (this.cart.species === 'screw') {
      this.cart.height = nutsByGost[this.cart.stateStandard].sizes[value].m
      this.cart.threadPitch = nutsByGost[this.cart.stateStandard].sizes[value].P
    }
    if (this.cart.species === 'washer') {
      this.cart.height = washersByGost[this.cart.stateStandard].sizes[value].t
      this.cart.outerDiameter = washersByGost[this.cart.stateStandard].sizes[value].D
      this.cart.innerDiameter = washersByGost[this.cart.stateStandard].sizes[value].d
    }
    if (this.cart.species === 'hairpin') {
      this.cart.lengths = studsByGost[this.cart.stateStandard].sizes[value].L.map(val => String(val))
      this.cart.threadLengths = this.threadLength

    }
    console.log('Выбран диаметр: ', value);
    console.log('Текущая корзина: ', this.cart);

    //CLEAR
    this.cart.length = ''
    this.cart.threadLength = ''
    this.cart.threadLengths = ['']
  }

  onLengthChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.cart.length = value;
    //TO DO
    this.cart.threadLengths = this.threadLength
    console.log('Выбрана длина: ', value);
    console.log('Текущая корзина: ', this.cart);

    //CLEAR
    this.cart.threadLength = ''
  }

  onThreadLengthChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.cart.threadLength = value;
    // this.currentCart.steelGrades = this.steelGrades;
    console.log('Выбрана длина резьбы: ', value);
    console.log('Текущая корзина: ', this.cart);

  }

  onSteelChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.cart.steelGrade = value;
    console.log('Выбрана сталь: ', value);
    console.log('Текущая корзина: ', this.cart);
  }

  onSubmit() {
    this.cart.execution = this.form.value.execution
    this.cart.quantity = this.form.value.quantity
    this.cart.delivery = this.form.value.delivery
    this.cart.volume = this.form.value.volume
    this.cart.comment = this.form.value.comment
    this.cartService.sendCart(this.cart)
      .subscribe({
        next: res => console.log('Корзина отправлена', res),
        error: err => console.error('Ошибка', err)
    });
    console.log(this.form.value);
  }

  ngOnInit() {

  }
}
