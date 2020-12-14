import { Injectable } from '@angular/core';
import { Subscrption } from "../interfaces/subscrption";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { CONFIGURATION } from './../interfdata/data-configuration';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

  apiURL = CONFIGURATION.apiURL;

  constructor(
    private httpClient: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  }

  public getAllSubscription(): Observable<Subscrption> {
    return this.httpClient
      .get<Subscrption>(
        this.apiURL + 'subscriptions/get',
        this.httpOptions)
      .pipe(retry(1), catchError(this.handleError))
  }



  public getMaxIdByUserSubscription(Subscrption): Observable<Subscrption> {
    return this.httpClient
      .post<Subscrption>(
        this.apiURL + 'subscriptions/getMax',
        JSON.stringify(Subscrption),
        this.httpOptions)
      .pipe(retry(1), catchError(this.handleError))
  }


  public getByUserSubscription(Subscrption): Observable<Subscrption> {
    return this.httpClient
      .post<Subscrption>(
        this.apiURL + 'subscriptions/get',
        JSON.stringify(Subscrption),
        this.httpOptions)
      .pipe(retry(1), catchError(this.handleError))
  }

  // HttpClient API post() method => Create Subscription
  public createSubscription(Subscription): Observable<Subscrption> {
    return this.httpClient
      .post<Subscrption>(
        this.apiURL + 'subscriptions/add',
        JSON.stringify(Subscription),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API put() method => Update Subscription
  updateSubscription(Subscription): Observable<Subscrption> {
    return this.httpClient
      .post<Subscrption>(
        this.apiURL + 'subscriptions/update',
        JSON.stringify(Subscription),
        this.httpOptions
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
