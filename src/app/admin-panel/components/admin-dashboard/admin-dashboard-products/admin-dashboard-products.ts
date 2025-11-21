import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../../../data/services/admin";
import {ISteelGrade, ISteelStandard, IWasherStandard} from "../../../../data/interfaces/product.interface";
import {DatePipe} from "@angular/common";
import {Popover} from "../admin-dashboard-suppliers/popover/popover";

@Component({
  selector: 'app-admin-dashboard-products',
  imports: [],
  templateUrl: './admin-dashboard-products.html',
  styleUrl: './admin-dashboard-products.scss'
})
export class AdminDashboardProducts implements OnInit {
  washerStandardData: IWasherStandard[] = [];
  washerGradeData: ISteelGrade[] = [];
  steelStandardData: ISteelStandard[] = [];
  steelGradeData: ISteelGrade[] = [];

  constructor(private adminService: AdminService) { }

  loadSteelStandards() {
    this.adminService.getWasherStandards().subscribe(data => {
      console.log("getWasherStandards");
      console.log(data);
      this.washerStandardData = data;
      }
    )
    this.adminService.getWasherGrades().subscribe(data => {
      console.log("getWasherGrades");
      console.log(data);
      this.washerGradeData = data;
    })
    this.adminService.getSteelStandards().subscribe(data => {
      console.log("getSteelStandards");
      console.log(data);
      this.steelStandardData = data;
    })
    this.adminService.getSteelGrades().subscribe(data => {
      console.log("getSteelGrades")
      console.log(data);
      this.steelGradeData = data;
    })
  }

  ngOnInit() {
    this.loadSteelStandards();
  }
}
