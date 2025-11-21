import { Component, OnInit } from '@angular/core';
import {Popover} from "../popover/popover";
import {IMaterials} from "../../../../../data/interfaces/product.interface";
import {debounceTime, distinctUntilChanged, Subject} from "rxjs";
import {AdminService} from "../../../../../data/services/admin";

@Component({
  selector: 'app-admin-dashboard-price',
  imports: [
    Popover
  ],
  templateUrl: './admin-dashboard-price.html',
  styleUrl: './admin-dashboard-price.scss'
})
export class AdminDashboardPrice implements OnInit {
  data: IMaterials[] = [];
  currentPage = 0;
  pageSize = 30;
  totalElements = 0;
  totalPages = 0;

  searchTerm: string = '';
  private searchTerms = new Subject<string>();

  constructor(private adminService: AdminService) { }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
    this.currentPage = page;
    this.loadSupplierMaterials();
  }
  }

  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  previousPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  loadSupplierMaterials() {
    this.adminService.getMaterialsFromSuppliers(
      this.currentPage,
      this.pageSize,
      this.searchTerm
    )
      .subscribe(
        res => {
          console.log(res);
          this.data = res.content.map(item => {
            if (item.parameter && item.parameter.includes('+')) {
              item.parameter = item.parameter.replaceAll('+', ' ');
            }
            return item;
          });
          this.totalElements = res.totalElements;
          this.totalPages = res.totalPages;
          this.currentPage = res.number;
        }
      )


  }

  ngOnInit() {
    this.searchTerms.pipe(
      debounceTime(300), // Ждем 300мс
      distinctUntilChanged(), // Если текст не поменялся, не ищем
    ).subscribe(term => {
      this.searchTerm = term;
      this.currentPage = 0; // Сбрасываем страницу при новом поиске
      this.loadSupplierMaterials();
    });

    this.loadSupplierMaterials();
  }

  onSearchInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerms.next(inputElement.value);
  }

}
