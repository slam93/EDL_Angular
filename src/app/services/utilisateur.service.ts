import { CONFIGURATION } from './../interfdata/data-configuration';
import { Utilisateur, Email } from 'src/app/interfaces/utilisateur';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, forkJoin } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UtilisateurService {

  // configuration de l'API utiliser
  apiURL = CONFIGURATION.apiURL;

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  // HttpClient API post() method => Login Utilisateur pour la connexion
  // tslint:disable-next-line:no-shadowed-variable
  public loginUtilisateur(Utilisateur): Observable<Utilisateur> {
    return this.http
      .post<Utilisateur>(
        this.apiURL + 'auth/login',
        JSON.stringify(Utilisateur),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  public getifemailexist(email): Observable<Email> {
    return this.http
      .post<Email>(
        this.apiURL + 'getifemailexist',
        JSON.stringify({ email }),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }


  public resetPassword(email): Observable<Email> {
    return this.http
      .post<Email>(
        this.apiURL + 'resetPassword',
        JSON.stringify({ email }),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }


  public editUserToInsertFbOrGoogle(data): Observable<Utilisateur> {
    return this.http
      .post<Utilisateur>(
        this.apiURL + 'editUserToInsertFbOrGoogle',
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  public addUserToInsertFbOrGoogle(data): Observable<Utilisateur> {
    return this.http
      .post<Utilisateur>(
        this.apiURL + 'addUserToInsertFbOrGoogle',
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API post() method => Inscription utilisateur
  // tslint:disable-next-line:no-shadowed-variable
  public inscriptionUtilisateur(Utilisateur): Observable<Utilisateur> {
    return this.http
      .post<Utilisateur>(
        this.apiURL + 'singin',
        JSON.stringify(Utilisateur),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API get() method => Fetch Utilisateurs
  public getUtilisateurMe(): Observable<Utilisateur> {
    return this.http
      .get<Utilisateur>(
        this.apiURL + 'auth/me',
        this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API post() method => Modification de la table Utilisateur
  public updateUtilisateur(Utilisateur): Observable<Utilisateur> {
    console.log(Utilisateur);
    return this.http
      .post<Utilisateur>(
        this.apiURL + 'update-user',
        JSON.stringify(Utilisateur),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API post() method => Upload image Utilisateur
  public uploadImageUtilisateur(formData): Observable<Utilisateur> {
    return this.http
      .post<Utilisateur>(
        this.apiURL + 'upload-image',
        formData,
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  public getAllUser(): Observable<Utilisateur> {
    return this.http
      .get<Utilisateur>(
        this.apiURL + 'users/getAll',
        this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  public getUserbyId(data): Observable<Utilisateur> {
    return this.http
      .post<Utilisateur>(
        this.apiURL + 'users/getById',
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
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
