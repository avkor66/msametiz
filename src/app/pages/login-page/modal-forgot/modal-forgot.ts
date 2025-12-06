import {Component, inject} from '@angular/core';
import {ModalService} from "../../../data/services/modal.service";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../../data/services/user";
import {Subject} from "rxjs";
import {AsyncPipe} from "@angular/common";

interface message {
  message: string;
  success: boolean;
}

@Component({
  selector: 'app-modal-forgot',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe
  ],
  templateUrl: './modal-forgot.html',
  styleUrl: './modal-forgot.scss'
})
export class ModalForgot {
  modalService = inject(ModalService);
  userService = inject(UserService);
  modalForm: FormGroup;
  inputEmail = ''

  constructor(private fb: FormBuilder) {
    this.modalForm = this.fb.group({
      inputEmail: ['', [Validators.required, Validators.email]],
    });
  }

  message$ = new Subject<string>();

  onSubmit() {
    if (this.modalForm.valid) {
      this.userService.sendEmail(this.modalForm.value.inputEmail).subscribe(
        (data: message) => {
          console.log(data);
          this.message$.next(data.message);
          setTimeout(() => {
            this.modalService.close();
          }, 2000)
        }
      )
    }
  }
}
