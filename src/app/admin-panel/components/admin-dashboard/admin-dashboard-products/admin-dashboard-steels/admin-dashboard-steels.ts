import {Component, OnInit} from '@angular/core';
import {ISteelStandard} from "../../../../../data/interfaces/product.interface";
import {AdminService} from "../../../../../data/services/admin";

@Component({
  selector: 'app-admin-dashboard-steels',
  imports: [],
  templateUrl: './admin-dashboard-steels.html',
  styleUrl: './admin-dashboard-steels.scss'
})

export class AdminDashboardSteels implements OnInit {
  steelStandardData: ISteelStandard[] = [];

  constructor(private adminService: AdminService) { }

  loadSteelStandards() {
    this.adminService.getSteelStandards().subscribe(data => {
      console.log("getSteelStandards");
      console.log(data);
      this.steelStandardData = data;
    })
  }

  ngOnInit() {
    this.loadSteelStandards();
  }
}
