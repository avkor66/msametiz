import {Component, inject, OnInit, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Auth} from "./auth/auth";
import {GuestService} from "./data/services/guest";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('Metservis');
  private authService = inject(Auth);
  private guestService = inject(GuestService);

  ngOnInit(): void {
    this.authService.initializeUser();
    this.guestService.initGuest();
  }
}
