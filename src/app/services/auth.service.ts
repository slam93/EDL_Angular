import { Injectable } from '@angular/core';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // Save dans cookie / localstorage
  public getToken(): string {
    return localStorage.getItem('token');
  }

}
