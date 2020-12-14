import { Injectable } from '@angular/core'
import { Section } from "../interfaces/section";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { CONFIGURATION } from './../interfdata/data-configuration';
import { Observable, throwError, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectionsService {

  apiURL = CONFIGURATION.apiURL

  constructor(
    private httpClient: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  }

  public getAllSection(): Observable<Section> {
    return this.httpClient
      .get<Section>(
        this.apiURL + 'sections/getAll',
        this.httpOptions)
      .pipe(retry(1), catchError(this.handleError))
  }

  public publicGetAllSection(): Observable<Section> {
    return this.httpClient
      .get<Section>(
        this.apiURL + 'public/section/get',
        this.httpOptions)
      .pipe(retry(1), catchError(this.handleError))
  }

  public addSection(data): Observable<Section> {
    return this.httpClient
      .post<Section>(
        this.apiURL + 'sections/add',
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError))
  }

  public updateSection(data): Observable<Section> {
    return this.httpClient
      .post<Section>(
        this.apiURL + 'sections/update',
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError))
  }

  public deleteSection(data): Observable<Section> {
    return this.httpClient
      .post<Section>(
        this.apiURL + 'sections/delete',
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError))
  }

  public uploadImageSection(formData): Observable<Section> {
    return this.httpClient
      .post<Section>(
        this.apiURL + 'upload-image',
        formData
      )
      .pipe(retry(1), catchError(this.handleError));
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
