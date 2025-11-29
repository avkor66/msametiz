import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  IBrands,
  IOrders, ISeries,
  ISteelGrade,
  ISteelStandard,
  ISupplierMaterials,
  IWasherStandard
} from "../interfaces/product.interface";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrlMaterials: string = `${environment.apiMaterialsUrl}products`;
  private apiUrlMaterials_: string = `http://localhost:8082/`;
  private apiUrlApplications: string = `${environment.apiApplicationsUrl}cart/costs`;
  private apiApplications: string = environment.apiApplicationsUrl;

  constructor(private http: HttpClient) {}

  getMaterialsFromSuppliers(page: number = 0, size: number = 10, searchTerm: string = ''): Observable<ISupplierMaterials> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    if (searchTerm.trim()) {params = params.set('search', searchTerm.trim())};
    return this.http.get<ISupplierMaterials>(this.apiUrlMaterials, { params });
  }

  getOrdersFromApplications() {
    return this.http.get<IOrders[]>(this.apiUrlApplications);
  }

  getSteelStandards() {
    return this.http.get<ISteelStandard[]>(`${environment.apiMaterialsUrl}steel/standard`, {withCredentials: true});
  }

  getSteelGrades() {
    return this.http.get<ISteelGrade[]>(`${environment.apiMaterialsUrl}steel/grade`, {withCredentials: true});
  }

  getWasherStandards() {
    return this.http.get<IWasherStandard[]>(`${environment.apiMaterialsUrl}details/washer/standard`, {withCredentials: true});
  }

  getWasherGrades() {
    return this.http.get<ISteelGrade[]>(`${environment.apiMaterialsUrl}details/washer/grade`, {withCredentials: true});
  }
}
