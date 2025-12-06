import {Component, inject, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../data/services/user";

@Component({
  selector: 'app-reset-password-page',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './reset-password-page.html',
  styleUrl: './reset-password-page.scss'
})
export class ResetPasswordPage {
  userService = inject(UserService);

  resetForm: FormGroup;
  token: string | undefined

  isPasswordVisible = signal<boolean>(false)

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute) {
    this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.activatedRoute.params.subscribe(params => {
      this.token = params['token'];
    });
  }

  onSubmit() {
    if (this.resetForm.valid) {
      this.userService.passwordReset(this.resetForm.value.newPassword, this.token).subscribe(
        //@ts-ignore
        data => {
          console.log(data);
        }
      )
      console.log(this.resetForm.value);
      console.log(this.token);
    }
  }
}
