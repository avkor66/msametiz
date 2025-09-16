import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from "../../service/modal.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() title: string = '';
  mode: 'signin' | 'signup' = 'signin';

  switchMode(newMode: 'signin' | 'signup') {
    this.mode = newMode;
  }

  constructor(public modalService: ModalService) { }

  ngOnInit(): void {
  }

}
