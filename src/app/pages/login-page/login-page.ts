import {Component, inject, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Auth} from '../../auth/auth';
import {Router} from '@angular/router';
import {Modal} from "../calc-page/modal/modal";
import {ModalService} from "../../data/services/modal.service";
import {AsyncPipe, NgClass} from "@angular/common";
import {SeriesModal} from "../calc-page/series-modal/series-modal";
import {ModalForgot} from "./modal-forgot/modal-forgot";
import {BehaviorSubject, catchError, debounce, delay, map, of, Subject, tap, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule,
    Modal,
    AsyncPipe,
    ModalForgot,
    NgClass
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss'
})
export class LoginPage {
  modalService = inject(ModalService);
  authService = inject(Auth);
  router = inject(Router);

  formSignIn: FormGroup;
  formSignUp: FormGroup;

  isAuthentication = signal<boolean>(true);

  isError$ = new Subject<string>()
  isErrorFlag$ = new BehaviorSubject<boolean>(false)
  isSuccess$ = new Subject<string>()
  isSuccessFlag$ = new BehaviorSubject<boolean>(false)

  isPasswordVisible = signal<boolean>(false)
  constructor(private fb: FormBuilder) {
    this.formSignIn = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.formSignUp = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  changeAuthentication() {
    this.isAuthentication.set(!this.isAuthentication());
  }

  onSubmit() {
    if(this.isAuthentication()) {

      if (this.formSignIn.valid) {
        this.authService.login(this.formSignIn.value)
          .subscribe(res => {
            this.router.navigate(['/']);
        })
      }
    } else {
      if (this.formSignUp.valid && this.formSignUp.value.password === this.formSignUp.value.confirmPassword) {
        this.authService.register(this.formSignUp.value)
          .pipe(
            catchError((error: HttpErrorResponse) => {
              if (error.status === 400) {
                if (error.error?.message?.toLowerCase().includes('email') || error.error?.message?.includes('exists')) {
                  this.isErrorFlag$.next(true)
                  this.isError$.next('Этот Email уже существует')
                } else {
                  this.isErrorFlag$.next(true)
                  this.isError$.next(error.error.message)
                }
              } else if (error.status === 500) {
                this.isErrorFlag$.next(true)
                  this.isError$.next('Ошибка сервера. Попробуйте позже')
              } else {
                this.isErrorFlag$.next(true)
                  this.isError$.next('Не удалось зарегистрироваться')
              }
              return error.error
            })
          )
          .subscribe({
            next: (res) => {
              this.isSuccessFlag$.next(true)
              this.isSuccess$.next('Регистрация успешна!')
              setTimeout(() => {
                this.router.navigate(['/login']).then(() => {
                    window.location.reload();
                });
              }, 1000)
            },
            error: (err) => {
              console.log('Не удалось зарегистрироваться')
              console.log(err)
            }
          });
      }
    }
  }
}
