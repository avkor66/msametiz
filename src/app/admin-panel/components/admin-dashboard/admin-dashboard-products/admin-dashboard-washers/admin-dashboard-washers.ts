import {Component, OnInit} from '@angular/core';
import {IWasherStandard} from "../../../../../data/interfaces/product.interface";
import {AdminService} from "../../../../../data/services/admin";

@Component({
  selector: 'app-admin-dashboard-washers',
  imports: [],
  templateUrl: './admin-dashboard-washers.html',
  styleUrl: './admin-dashboard-washers.scss'
})

export class AdminDashboardWashers implements OnInit {
  washerStandardData: IWasherStandard[] = [];

  constructor(private adminService: AdminService) { }

  loadWasherStandards() {
    this.adminService.getWasherStandards().subscribe(data => {
        console.log("getWasherStandards");
        console.log(data);
        this.washerStandardData = data;
      }
    )
  }

  ngOnInit() {
    this.loadWasherStandards();
  }
}
