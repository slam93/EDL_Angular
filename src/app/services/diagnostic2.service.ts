import { CONFIGURATION } from './../interfdata/data-configuration';
import { Diagnostic2 } from './../interfaces/Diagnostic2';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Diagnostic2Service {
  // Configuration API  ,  LIEN
  // "http://localhost:3000" |'http://mailbusiness.fr'|'http://api.evertuoo.devforge.eu'|'http://192.168.43.51:3000'
  apiURL = CONFIGURATION.apiURL;

  constructor(private http: HttpClient) {}

  // Http Options  |  Http Interceptor deja ajouter
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  // HttpClient API get() method => Fetch Diagnostic2s list     ||  get all
  getDiagnostic2s(): Observable<Diagnostic2> {
    return this.http
      .get<Diagnostic2>(this.apiURL + 'diagnostics2/getAll', this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Public get diag2
  publicGetDiagnostic2s(): Observable<Diagnostic2> {
    return this.http
      .get<Diagnostic2>(this.apiURL + 'public/diagnostic2/getAll', this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API get() method => Fetch Diagnostic2s list     ||  get by id
  getDiagnostic2sById(paramId): Observable<Diagnostic2> {
    return this.http
      .post<Diagnostic2>(
        this.apiURL + 'diagnostics2/getById',
        JSON.stringify(paramId),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // // HttpClient API get() method => Fetch Diagnostic2
  // getDiagnostic2(id): Observable<Diagnostic2> {
  //   return this.http
  //     .get<Diagnostic2>(this.apiURL + '/Diagnostic2s/' + id, this.httpOptions)
  //     .pipe(retry(1), catchError(this.handleError));
  // }

  // HttpClient API post() method => Create Diagnostic2
  createDiagnostic2(Diagnostic2): Observable<Diagnostic2> {
    return this.http
      .post<Diagnostic2>(
        this.apiURL + 'diagnostics2/add',
        JSON.stringify(Diagnostic2),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API put() method => Update Diagnostic2
  updateDiagnostic2( Diagnostic2): Observable<Diagnostic2> {
    return this.http
      .post<Diagnostic2>(
        this.apiURL + 'diagnostics2/update',
        JSON.stringify(Diagnostic2),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API delete() method => Delete Diagnostic2
  deleteDiagnostic2(id): Observable<Diagnostic2> {
    return this.http
      .post<Diagnostic2>(this.apiURL + 'diagnostics2/delete', JSON.stringify(id), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  public getDiagnostic2BySection(paramId): Observable<Diagnostic2> {
    return this.http
      .post<Diagnostic2>(
        this.apiURL + 'diagnostics2BySection/get',
        JSON.stringify(paramId),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // Public get diagnostic by section
  publicGetDiagnostic2BySection(paramId): Observable<Diagnostic2> {
    return this.http
      .post<Diagnostic2>(
        this.apiURL + 'public/diag-section/get',
        JSON.stringify(paramId),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  //#########################       Error handling      ###########################################
  handleError(error) {
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
