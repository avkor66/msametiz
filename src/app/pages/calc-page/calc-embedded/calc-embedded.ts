import {Component, inject, OnInit} from '@angular/core';
import {ProductService} from "../../../data/services/product.service";
import {IBrands, ISeries} from "../../../data/interfaces/product.interface";
import {SeriesCard} from "../series-card/series-card";
import {AsyncPipe} from "@angular/common";
import {Modal} from "../modal/modal";
import {ModalService} from "../../../data/services/modal.service";
import {SeriesModal} from "../series-modal/series-modal";
import {Subject} from "rxjs";

@Component({
  selector: 'app-calc-embedded',
  imports: [
    SeriesCard,
    AsyncPipe,
    Modal,
    SeriesModal
  ],
  templateUrl: './calc-embedded.html',
  styleUrl: './calc-embedded.scss'
})
export class CalcEmbedded implements OnInit {

  modalService = inject(ModalService);
  series = new Subject<ISeries>();
  brands = new Subject<IBrands>();

  constructor(private productService: ProductService) {}

  loadSeries() {
    this.productService.getSeries()
      .subscribe(data => {
        this.series.next(data);
      }
    )
  }
  loadBrands() {
    this.productService.getBrands()
      .subscribe(data  => {
        this.brands.next(data);
      }
    )
  }
  ngOnInit() {
    this.loadSeries();
    this.loadBrands();
  }
}