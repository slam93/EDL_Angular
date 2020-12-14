import { CONFIGURATION } from './../interfdata/data-configuration';
import { Donation } from './../interfaces/Donation';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DonationService {
  // Configuration API  ,  LIEN
  // "http://localhost:3000" |'http://mailbusiness.fr'|'http://api.evertuoo.devforge.eu'|'http://192.168.43.51:3000'
  private apiURL = CONFIGURATION.apiURL;

  constructor(private http: HttpClient) {}

  // Http Options  |  Http Interceptor deja ajouter
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };

  // HttpClient API get() method => Fetch Donations list     ||  get all
  getDonations(): Observable<Donation> {
    return this.http
      .get<Donation>(this.apiURL + 'donations/getAll', this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API put() method => Update Donation
  updateDonation( Donation): Observable<Donation> {
    return this.http
      .post<Donation>(
        this.apiURL + 'donations/update',
        JSON.stringify(Donation),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }


  // getDonationsPublic(): Observable<Donation> {
  //   return this.http
  //     .get<Donation>(this.apiURL + 'public/Donations/getAll', this.httpOptions)
  //     .pipe(retry(1), catchError(this.handleError));
  // }

  // // HttpClient API get() method => Fetch Donations list     ||  get by user
  // getDonationsByUser(paramId): Observable<Donation> {
  //   return this.http
  //     .post<Donation>(
  //       this.apiURL + 'Donations/getByUser',
  //       JSON.stringify(paramId),
  //       this.httpOptions
  //     )
  //     .pipe(retry(1), catchError(this.handleError));
  // }

  // // HttpClient API get() method => Fetch Donation
  // getDonation(id): Observable<Donation> {
  //   return this.http
  //     .get<Donation>(this.apiURL + '/Donations/' + id, this.httpOptions)
  //     .pipe(retry(1), catchError(this.handleError));
  // }

  // // HttpClient API post() method => Create Donation
  // createDonation(Donation): Observable<Donation> {
  //   return this.http
  //     .post<Donation>(
  //       this.apiURL + 'Donations/add',
  //       JSON.stringify(Donation),
  //       this.httpOptions
  //     )
  //     .pipe(retry(1), catchError(this.handleError));
  // }

  
  // // HttpClient API delete() method => Delete Donation
  // deleteDonation(id) {
  //   return this.http
  //     .post<Donation>(this.apiURL + 'Donations/delete', id, this.httpOptions)
  //     .pipe(retry(1), catchError(this.handleError));
  // }

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
