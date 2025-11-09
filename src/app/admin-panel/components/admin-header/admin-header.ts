import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-admin-header',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './admin-header.html',
  styleUrl: './admin-header.scss'
})
export class AdminHeader {

}
