import { CONFIGURATION } from './../interfdata/data-configuration';
import { Car } from './../interfaces/car';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CarService {
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

  // HttpClient API get() method => Fetch Cars list     ||  get all
  getCars(): Observable<Car> {
    return this.http
      .get<Car>(this.apiURL + 'cars/getAll', this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getCarsPublic(): Observable<Car> {
    return this.http
      .get<Car>(this.apiURL + 'public/cars/getAll', this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API get() method => Fetch Cars list     ||  get by user
  getCarsByUser(paramId): Observable<Car> {
    return this.http
      .post<Car>(
        this.apiURL + 'cars/getByUser',
        JSON.stringify(paramId),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // // HttpClient API get() method => Fetch Car
  // getCar(id): Observable<Car> {
  //   return this.http
  //     .get<Car>(this.apiURL + '/Cars/' + id, this.httpOptions)
  //     .pipe(retry(1), catchError(this.handleError));
  // }

  // HttpClient API post() method => Create Car
  createCar(Car): Observable<Car> {
    return this.http
      .post<Car>(
        this.apiURL + 'cars/add',
        JSON.stringify(Car),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API put() method => Update Car
  updateCar( Car): Observable<Car> {
    return this.http
      .post<Car>(
        this.apiURL + 'cars/update',
        JSON.stringify(Car),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API delete() method => Delete Car
  deleteCar(id) {
    return this.http
      .post<Car>(this.apiURL + 'cars/delete', id, this.httpOptions)
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
