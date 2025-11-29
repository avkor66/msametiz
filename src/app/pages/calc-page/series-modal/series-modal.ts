import {Component, inject, OnInit} from '@angular/core';
import {ModalService} from "../../../data/services/modal.service";
import {IBrand} from "../../../data/interfaces/product.interface";
import {Subject} from "rxjs";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-series-modal',
  imports: [
    AsyncPipe
  ],
  templateUrl: './series-modal.html',
  styleUrl: './series-modal.scss'
})
export class SeriesModal implements OnInit {
  modalService = inject(ModalService);
  currentBrands = new Subject<IBrand>

  ngOnInit() {
    this.modalService.brand.subscribe(brand => {
      this.currentBrands.next(brand);
    })
  }

}
