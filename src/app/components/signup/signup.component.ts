import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form = new FormGroup({
    title: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })

  get email() { return this.form.controls.email as FormControl; }
  get password() { return this.form.controls.password as FormControl; }

  constructor() { }

  ngOnInit(): void {
  }

  submit() {
    console.log(this.form.value)
    // const email = this.form.get('email').value;
    // const password = this.form.get('password').value;

  }
}
