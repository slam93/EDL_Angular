import { Injectable } from '@angular/core';
import { Skill } from "../interfaces/skill";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { CONFIGURATION } from './../interfdata/data-configuration';
import { Vehicule } from '../interfaces/vehicule';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  public apiURL = CONFIGURATION.apiURL;

  constructor(
    private httpClient: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  /**
   * getSkillsByDiagnostic2Selected
   */
  public getSkillsByDiagnostic2Selected(data): Observable<Skill> {
    return this.httpClient
      .post<Skill>(
        this.apiURL + 'skills/getDiagnostic2Skill',
        JSON.stringify(data),
        this.httpOptions
      ).pipe(retry(1), catchError(this.handleError))
  }

  /**
   * publicGet
   */
  public publicGetSkillsByDiagnostic2Selected(data): Observable<Skill> {
    return this.httpClient
      .post<Skill>(
        this.apiURL + 'public/skills/getDiagnostic2Skill',
        JSON.stringify(data),
        this.httpOptions
      ).pipe(retry(1), catchError(this.handleError))
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
