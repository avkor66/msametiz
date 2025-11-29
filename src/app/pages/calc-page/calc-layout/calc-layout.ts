import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {AdminHeader} from "../../../admin-panel/components/admin-header/admin-header";
import {AdminSidebar} from "../../../admin-panel/components/admin-sidebar/admin-sidebar";
import {Header} from "../../../layout/header/header";
import {Footer} from "../../../layout/footer/footer";
import {CalcSidebar} from "../calc-sidebar/calc-sidebar";

@Component({
  selector: 'app-calc-layout',
  imports: [
    RouterOutlet,
    Header,
    Footer,
    CalcSidebar
  ],
  templateUrl: './calc-layout.html',
  styleUrl: './calc-layout.scss'
})
export class CalcLayout {

}
