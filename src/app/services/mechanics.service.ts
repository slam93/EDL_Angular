import { CONFIGURATION } from './../interfdata/data-configuration';
import { Mecano } from './../interfaces/Mecano';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MecanoService {
  // Configuration API  ,  LIEN
  // "http://localhost:3000" |'http://mailbusiness.fr'|'http://api.evertuoo.devforge.eu'|'http://192.168.43.51:3000'
  private apiURL = CONFIGURATION.apiURL;

  constructor(private http: HttpClient) {}

  // Http Options  |  Http Interceptor deja ajouter
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };

  // HttpClient API get() method => Fetch Mecanos list     ||  get all
  // getMecanos(): Observable<Mecano> {
  //   return this.http
  //     .get<Mecano>(this.apiURL + 'mechanics/getAll', this.httpOptions)
  //     .pipe(retry(1), catchError(this.handleError));
  // }

  // getMecanosPublic(): Observable<Mecano> {
  //   return this.http
  //     .get<Mecano>(this.apiURL + 'public/Mecanos/getAll', this.httpOptions)
  //     .pipe(retry(1), catchError(this.handleError));
  // }

  // HttpClient API get() method => Fetch Mecanos list     ||  get by user
  // getMecanosByUser(paramId): Observable<Mecano> {
  //   return this.http
  //     .post<Mecano>(
  //       this.apiURL + 'mechanics/getByUser',
  //       JSON.stringify(paramId),
  //       this.httpOptions
  //     )
  //     .pipe(retry(1), catchError(this.handleError));
  // }

  // HttpClient API post() method => Upload image Utilisateur
  public uploadImageMechanic(formData): Observable<Mecano> {
    return this.http
      .post<Mecano>(
        this.apiURL + 'upload-image',
        formData,
      )
      .pipe(retry(1), catchError(this.handleError));
  }


  // // HttpClient API get() method => Fetch Mecano
  getMecanoByUserId(Mecano): Observable<Mecano> {
    return this.http
      .post<Mecano>(this.apiURL + 'mechanics/getByUserId',
      JSON.stringify(Mecano),
      this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API post() method => Create Mecano
  createMecano(Mecano): Observable<Mecano> {
    return this.http
      .post<Mecano>(
        this.apiURL + 'public/mechanics/add',
        JSON.stringify(Mecano),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API put() method => Update Mecano
  updateMecano( Mecano): Observable<Mecano> {
    return this.http
      .post<Mecano>(
        this.apiURL + 'mechanics/update',
        JSON.stringify(Mecano),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // // HttpClient API delete() method => Delete Mecano
  // deleteMecano(id) {
  //   return this.http
  //     .post<Mecano>(this.apiURL + 'Mecanos/delete', id, this.httpOptions)
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
