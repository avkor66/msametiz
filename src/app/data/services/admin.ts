import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from '../../../environments/environment';
import {IOrders, ISupplierMaterials} from "../interfaces/product.interface";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrlMaterials: string = `${environment.apiMaterialsUrl}products`;
  private apiUrlApplications: string = `${environment.apiApplicationsUrl}cart/costs`;

  constructor(private http: HttpClient) {}

  getMaterialsFromSuppliers(page: number = 0, size: number = 10, searchTerm: string = ''): Observable<ISupplierMaterials> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    if (searchTerm.trim()) {params = params.set('search', searchTerm.trim())};
    return this.http.get<ISupplierMaterials>(this.apiUrlMaterials, { params });
  }

  getOrdersFromApplications() {
    return this.http.get<IOrders[]>(this.apiUrlApplications);
  }
}
