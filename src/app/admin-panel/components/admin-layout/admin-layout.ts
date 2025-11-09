import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterOutlet, UrlSegment} from "@angular/router";
import {AdminHeader} from "../admin-header/admin-header";
import {AdminSidebar} from "../admin-sidebar/admin-sidebar";
import {filter, Subscription} from "rxjs";

@Component({
  selector: 'app-admin-layout',
  imports: [
    RouterOutlet,
    AdminHeader,
    AdminSidebar,
  ],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss'
})

export class AdminLayout {

}

