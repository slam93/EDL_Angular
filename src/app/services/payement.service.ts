import { CONFIGURATION } from '../interfdata/data-configuration';
import { Utilisateur, Email } from 'src/app/interfaces/utilisateur';
import { Payement } from 'src/app/interfaces/payement';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, forkJoin } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PayementService {

  // configuration de l'API utiliser
  apiURL = CONFIGURATION.apiURL;

  constructor(private http: HttpClient) {}

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
      // 'Authorization': 'Bearer ' + localStorage.getItem('token')    |   Utilisation HttpInterceptor
    }),
  };

  /**
   *  HttpClient API post() method => enregistrement d'un payement paypal
   * @param Payement 
   */
  // tslint:disable-next-line:no-shadowed-variable
  public savePayements( Payement ): Observable<Payement> {
    return this.http
      .post<Payement>(
        this.apiURL + 'payments/add',
        JSON.stringify(Payement),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  /**
   *  HttpClient API post() method => enregistrement d'un payement stripe
   * @param  
   */
  // tslint:disable-next-line:no-shadowed-variable
  public stripePayements( Payement ): Observable<any> {
    return this.http
      .post<any>(
        this.apiURL + 'stripe-order',
        JSON.stringify(Payement),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }
  /**
   *  HttpClient API post() method => Get By user
   * @param Payement
   */
  // tslint:disable-next-line:no-shadowed-variable
  public getByUserPayment( Payement ): Observable<Payement> {
    return this.http
      .post<Payement>(
        this.apiURL + 'payments/getClient',
        JSON.stringify(Payement),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  // Error handling
  public handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // window.alert(errorMessage);
    console.log(['Erreur HTTP', errorMessage]);
    return throwError(errorMessage);
  }

}
