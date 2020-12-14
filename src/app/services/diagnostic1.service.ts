import { CONFIGURATION } from './../interfdata/data-configuration';
import { Diagnostic1 } from './../interfaces/Diagnostic1';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Diagnostic1Service {
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

  // HttpClient API get() method => Fetch Diagnostic1s list     ||  get all
  getDiagnostic1s(): Observable<Diagnostic1> {
    return this.http
      .get<Diagnostic1>(this.apiURL + 'diagnostics1/getAll', this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API get() method => Fetch Diagnostic1s list     ||  get by id
  getDiagnostic1sById(paramId): Observable<Diagnostic1> {
    return this.http
      .post<Diagnostic1>(
        this.apiURL + 'diagnostics1/getById',
        JSON.stringify(paramId),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API get() method => Fetch Diagnostic1s list     ||  get by id
  getDiagnostic1sByIdPublic(paramId): Observable<Diagnostic1> {
    return this.http
      .post<Diagnostic1>(
        this.apiURL + 'public/diagnostics1/getById',
        JSON.stringify(paramId),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // // HttpClient API get() method => Fetch Diagnostic1
  // getDiagnostic1(id): Observable<Diagnostic1> {
  //   return this.http
  //     .get<Diagnostic1>(this.apiURL + '/Diagnostic1s/' + id, this.httpOptions)
  //     .pipe(retry(1), catchError(this.handleError));
  // }

  // HttpClient API post() method => Create Diagnostic1
  createDiagnostic1(Diagnostic1): Observable<Diagnostic1> {
    return this.http
      .post<Diagnostic1>(
        this.apiURL + 'diagnostic1s/add',
        JSON.stringify(Diagnostic1),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API put() method => Update Diagnostic1
  updateDiagnostic1( Diagnostic1): Observable<Diagnostic1> {
    return this.http
      .post<Diagnostic1>(
        this.apiURL + 'diagnostic1s/update',
        JSON.stringify(Diagnostic1),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API delete() method => Delete Diagnostic1
  deleteDiagnostic1(id) {
    return this.http
      .post<Diagnostic1>(this.apiURL + 'diagnostic1s/delete', id, this.httpOptions)
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
