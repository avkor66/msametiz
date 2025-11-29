import {inject, Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, delay, Observable, throwError} from "rxjs";
import {Product} from "./product.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})

export class ProductService {
  private http = inject(HttpClient);

  private productsUrl = `${environment.apiApplicationsUrl}products`;

  getProducts() : Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl).pipe(
      delay(1000),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error('Ошибка загрузки товаров, пожалуйста, попробуйте загрузить позже!'))
      })
    )
  }
}