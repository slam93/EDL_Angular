import { Injectable } from '@angular/core';
import { Category } from "../interfaces/categorie";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { CONFIGURATION } from './../interfdata/data-configuration';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  apiURL = CONFIGURATION.apiURL;

  constructor(private httpClient: HttpClient) { }

  // 'Authorization': 'Bearer ' + localStorage.getItem('token') =>  Utilisation HttpInterceptor
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  }

  public addCategories(data): Observable<Category> {
    return this.httpClient
      .post<Category>(
        this.apiURL + 'categories/add',
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError))
  }

  public getAllCategories(): Observable<Category> {
    return this.httpClient
      .get<Category>(
        this.apiURL + 'categories/getAll',
        this.httpOptions)
      .pipe(retry(1), catchError(this.handleError))
  }

  public updateCategories(data): Observable<Category> {
    return this.httpClient
      .post<Category>(
        this.apiURL + 'categories/update',
        JSON.stringify(data),
        this.httpOptions)
      .pipe(retry(1), catchError(this.handleError))
  }

  public deleteCategories(data): Observable<Category> {
    return this.httpClient
      .post<Category>(
        this.apiURL + 'categories/delete',
        JSON.stringify(data),
        this.httpOptions)
      .pipe(retry(1), catchError(this.handleError))
  }

  // Error handling
  public handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(['Erreur HTTP', errorMessage]);
    return throwError(errorMessage);
  }
}
