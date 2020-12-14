import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Category} from '../interfaces/categorie';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor(private http: HttpClient) {}

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  public postHelper( data, url ): Observable<any> {
    return this.http
      .post<any>(
        url,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  public getHelper( url ): Observable<any> {
    return this.http
      .get<Category>(
        url,
        this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

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

//    public quantityMatch(quantity: string, equipement: any) {
//    return (formGroup: FormGroup) => {
//     const control = formGroup.controls[controlName];
//     const matchingControl = formGroup.controls[matchingControlName];
//
//     if (matchingControl.errors && !matchingControl.errors.mustMatch) {
//       // return if another validator has already found an error on the matchingControl
//       return;
//     }
//
//     // set error on matchingControl if validation fails
//     if (control.value !== matchingControl.value) {
//       matchingControl.setErrors({ mustMatch: true });
//     } else {
//       matchingControl.setErrors(null);
//     }
//   }
//
 }
