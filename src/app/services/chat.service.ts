import { CONFIGURATION } from '../interfdata/data-configuration';
import { Chat } from '../interfaces/chat';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
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

  /**
   * retourne les echange entre client et mecanicien 
   * echancge correspondant a un intervention specifique
   * @param intervention
   *
   */
  getChatByInterventionId(intervention): Observable<Chat> {
    return this.http
      .post<Chat>(
        this.apiURL + 'intervention-chat',
        JSON.stringify(intervention),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  /**
   * retourne les echange entre client et mecanicien ou admin
   * echancge correspondant a un idreceiver specifique
   * @param idreceiver
   *
   */
  getChatByidreceiver(idreceiver): Observable<Chat> {
    return this.http
      .post<Chat>(
        this.apiURL + 'receiver-chat',
        JSON.stringify(idreceiver),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

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
