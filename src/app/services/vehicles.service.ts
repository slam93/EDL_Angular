import { Injectable } from '@angular/core';
import { Vehicle } from '../interfaces/vehicles';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { CONFIGURATION } from './../interfdata/data-configuration';
import { Vehicule } from '../interfaces/vehicule';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  /* ########################################           VARIABLE                 ############################################## */
  private apiURL = CONFIGURATION.apiURL;

  /* ########################################           CONSTRUCTOR                 ############################################## */
  constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  /* ########################################           FUNCTION                 ############################################## */
  public getAllVehicles(): Observable<Vehicle> {
    return this.httpClient
      .get<Vehicule>(this.apiURL + 'vehicles/getAll', this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  public getAllVehiclesPublic(): Observable<Vehicle> {
    return this.httpClient
      .get<Vehicule>(this.apiURL + 'public/vehicles/getAll', this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  public getByIdVehicles(paramId): Observable<Vehicle> {
    return this.httpClient
      .post<Vehicule>(this.apiURL + 'vehicles/getById',
      JSON.stringify(paramId),
      this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  public addVehicle(data): Observable<Vehicule> {
    return this.httpClient
      .post<Vehicle>(
        this.apiURL + 'vehicles/add',
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  public updateVehicle(data): Observable<Vehicle> {
    return this.httpClient
      .post<Vehicle>(
        this.apiURL + 'vehicles/update',
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  public deleteVehicle(data): Observable<Vehicle> {
    return this.httpClient
      .post<Vehicle>(
        this.apiURL + 'vehicles/delete',
        JSON.stringify(data),
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

  public getVehicleByName(paramName, listeVehicles) {
    console.log([paramName, listeVehicles]);
    for (let vehi of listeVehicles) {
      if (vehi.model === paramName) {
        return vehi;
      }
    }
    return listeVehicles[0];
  }

}
