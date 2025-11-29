import {inject, Injectable} from '@angular/core';
import {IBrands, ISeries} from "../interfaces/product.interface";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CalcEmbedded} from "../../pages/calc-page/calc-embedded/calc-embedded";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);

  private apiApplications: string = environment.apiApplicationsUrl;


  getSeries() {
    return this.http.get<ISeries>(`${this.apiApplications}products/series`, {withCredentials: true});
  }

  getBrands() {
    return this.http.get<IBrands>(`${this.apiApplications}products/series/brands`, {withCredentials: true});
  }
}
