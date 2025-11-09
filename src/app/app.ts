import {Component, inject, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Auth} from "./auth/auth";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Metservis');
  private authService = inject(Auth);

  ngOnInit(): void {
    this.authService.initializeUser();
  }
}
