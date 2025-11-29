import {Component, inject} from '@angular/core';
import {ModalService} from "../../../data/services/modal.service";

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.scss'
})
export class Modal {
  modalService = inject(ModalService);
}
