import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { ErrorHandler } from '../shared/error-handler';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  // tslint:disable-next-line:variable-name
  private _usersUrl = 'http://localhost:3000/auth/system-users';
  // tslint:disable-next-line:variable-name
  private _existDataUrl = 'http://localhost:3000/auth/exist-data';
  errorsHandler = new ErrorHandler();

  constructor(private http: HttpClient) {
  }

  getSystemUsers(): Observable<User[]> {
    try {
      return this.http.get<User[]>(this._usersUrl);
    } catch (error) {
      this.errorsHandler.handleError(error);
    }
  }

  getExistData(): Observable<any> {
    try {
      return this.http.get<any>(this._existDataUrl);
    } catch (error) {
      this.errorsHandler.handleError(error);
    }
  }
}
