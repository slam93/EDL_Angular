import { CONFIGURATION } from './../interfdata/data-configuration';
import { Intervention } from './../interfaces/Intervention';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class InterventionService {

  // Configuration API  ,  LIEN
  // "http://localhost:3000" |'http://mailbusiness.fr'|'http://api.evertuoo.devforge.eu'|'http://192.168.43.51:3000'
  private apiURL = CONFIGURATION.apiURL;

  constructor(private http: HttpClient) {}

  // Http Options  |  Http Interceptor deja ajouter
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  // HttpClient API get() method => Fetch Interventions list
  getInterventions(): Observable<Intervention> {
    return this.http
      .get<Intervention>(this.apiURL + 'Interventions', this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API get() method => Fetch Interventions list by user
  getByUserInterventions(paramUser): Observable<Intervention> {
    return this.http
      .post<Intervention>(this.apiURL + 'client-intervention',
      JSON.stringify(paramUser),
      this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

   // HttpClient API get() method => Fetch Interventions list by id
   getInterventionById(id): Observable<Intervention> {
    return this.http
      .post<Intervention>(this.apiURL + 'getIntervention',
      JSON.stringify({interventionId: id}),
      this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API get() method => Fetch Interventions list by mechanicId 
  getByMechanicIdInterventions(paramMecano): Observable<Intervention> {
    return this.http
      .post<Intervention>(this.apiURL + 'interventions/getByMecanoId',
      JSON.stringify(paramMecano),
      this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // // HttpClient API get() method => Fetch Intervention
  // getIntervention(id): Observable<Intervention> {
  //   return this.http
  //     .get<Intervention>(this.apiURL + '/Interventions/' + id, this.httpOptions)
  //     .pipe(retry(1), catchError(this.handleError));
  // }

  // HttpClient API post() method => Create Intervention
  createIntervention(Intervention): Observable<Intervention> {
    return this.http
      .post<Intervention>(
        this.apiURL + 'interventions/add',
        JSON.stringify(Intervention),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API put() method => Update Intervention
  updateIntervention(Intervention): Observable<Intervention> {
    return this.http
      .post<Intervention>(
        this.apiURL + 'interventions/update',
        JSON.stringify(Intervention),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // // HttpClient API delete() method => Delete Intervention
  // deleteIntervention(id) {
  //   return this.http
  //     .delete<Intervention>(this.apiURL + '/Interventions/' + id, this.httpOptions)
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
