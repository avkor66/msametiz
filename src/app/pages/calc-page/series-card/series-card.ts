import {Component, inject, Input} from '@angular/core';
import {IBrand} from "../../../data/interfaces/product.interface";
import {ModalService as ModalService} from "../../../data/services/modal.service";

@Component({
  selector: 'app-series-card',
  imports: [],
  templateUrl: './series-card.html',
  styleUrl: './series-card.scss'
})
export class SeriesCard {
  @Input() film!: IBrand
  modalService = inject(ModalService);



}
