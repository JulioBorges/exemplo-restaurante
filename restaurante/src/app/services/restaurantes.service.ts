import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Restaurante } from '../models/restaurante';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { Constants } from '../constants/constant';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class RestaurantesService {
  restaurantesUrl = Constants.API_URL + 'api/restaurantes';
  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('RestaurantesService');
  }

  getRestaurantes(): Observable<Restaurante[]> {
    return this.http
      .get<Restaurante[]>(this.restaurantesUrl)
      .pipe(catchError(this.handleError('getRestaurantes', [])));
  }

  getRestaurante(id: number): Observable<Restaurante> {
    const url = `${this.restaurantesUrl}/${id}`;

    return this.http
      .get<Restaurante>(url)
      .pipe(catchError(this.handleError<Restaurante>('getRestaurantes', null)));
  }

  searchRestaurantes(term: string): Observable<Restaurante[]> {
    term = term.trim();

    const url = `${this.restaurantesUrl}/pesquisa/${term}`;

    return this.http
      .get<Restaurante[]>(url)
      .pipe(catchError(this.handleError<Restaurante[]>('searchRestaurantes', [])));
  }

  addRestaurante(restaurante: Restaurante): Observable<Restaurante> {
    return this.http
      .post<Restaurante>(this.restaurantesUrl, restaurante, httpOptions)
      .pipe(catchError(this.handleError('addRestaurante', restaurante)));
  }

  deleteRestaurante(id: number): Observable<{}> {
    const url = `${this.restaurantesUrl}/${id}`;
    return this.http
      .delete(url, httpOptions)
      .pipe(catchError(this.handleError('deleteRestaurante')));
  }

  updateRestaurante(restaurante: Restaurante): Observable<Restaurante> {
    const url = `${this.restaurantesUrl}/${restaurante.id}`;
    return this.http
      .put<Restaurante>(url, restaurante, httpOptions)
      .pipe(catchError(this.handleError('updateRestaurante', restaurante)));
  }
}
