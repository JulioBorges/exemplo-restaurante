import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Prato } from '../models/prato';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { Constants } from '../constants/constant';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class PratosService {
  pratosUrl = Constants.API_URL + 'api/pratos';
  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('PratosService');
  }

  getPratos(): Observable<Prato[]> {
    return this.http
      .get<Prato[]>(this.pratosUrl)
      .pipe(catchError(this.handleError('getPratos', [])));
  }

  getPrato(id: number): Observable<Prato> {
    const url = `${this.pratosUrl}/${id}`;

    return this.http.get<Prato>(url).pipe(catchError(this.handleError<Prato>('getPratos', null)));
  }

  searchPratos(term: string): Observable<Prato[]> {
    term = term.trim();

    const url = `${this.pratosUrl}/pesquisa/${term}`;

    return this.http
      .get<Prato[]>(url)
      .pipe(catchError(this.handleError<Prato[]>('searchPratos', [])));
  }

  addPrato(prato: Prato): Observable<Prato> {
    return this.http
      .post<Prato>(this.pratosUrl, prato, httpOptions)
      .pipe(catchError(this.handleError('addPrato', prato)));
  }

  deletePrato(id: number): Observable<{}> {
    const url = `${this.pratosUrl}/${id}`;
    return this.http.delete(url, httpOptions).pipe(catchError(this.handleError('deletePrato')));
  }

  updatePrato(prato: Prato): Observable<Prato> {
    const url = `${this.pratosUrl}/${prato.id}`;
    return this.http
      .put<Prato>(url, prato, httpOptions)
      .pipe(catchError(this.handleError('updatePrato', prato)));
  }
}
