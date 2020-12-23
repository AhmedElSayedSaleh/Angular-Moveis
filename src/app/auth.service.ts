import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserData } from './userData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public _HttpClient: HttpClient) { }

  userData = new BehaviorSubject(null);

  signUp(data): Observable<any> {
    return this._HttpClient.post('http://routeegypt.herokuapp.com/signup', data);
  }

  logIn(data): Observable<any> {
    return this._HttpClient.post('http://routeegypt.herokuapp.com/signin', data);
  }

  saveUserData(logUser, token): any {
    const user = new UserData(logUser.first_name, logUser.last_name, logUser.email, token);

    this.userData.next(user);
  }
}
