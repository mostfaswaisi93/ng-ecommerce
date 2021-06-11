import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/models/cart';
import { CartItem } from 'src/app/models/cart-item';
import { Profile } from 'src/app/models/profile';
import { User } from 'src/app/models/user';
import { UserData } from 'src/app/models/user-data';
import { ErrorHandler } from 'src/app/shared/error-handler';
import { CartService } from '../cart/cart.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router, private cartService: CartService) { }

  // tslint:disable-next-line:variable-name
  _registerUrl = `http://localhost:3000/auth/register`;
  // tslint:disable-next-line:variable-name
  _loginUrl = `http://localhost:3000/auth/login`;
  // tslint:disable-next-line:variable-name
  _userUrl = `http://localhost:3000/auth/current-user`;
  // tslint:disable-next-line:variable-name
  _profileUrl = `http://localhost:3000/profile`;
  // tslint:disable-next-line:variable-name
  private _usersURL = `http://localhost:3000/auth/system-users`;
  // tslint:disable-next-line:variable-name
  private _userDataURL = `http://localhost:3000/auth/user-main-data`;

  private imageChangeUrl = `http://localhost:3000/profile/userprofile/changeprofileimage`;
  private newImageUrl = `http://localhost:3000/profile/userprofile/setprofileimage`;
  private contactUrl = `http://localhost:3000/contacts/new-mail`;
  errorsHandler = new ErrorHandler();
  public username: string;
  public cart: Cart;
  public cartItem: CartItem;
  public profile: Profile;
  public currentUser: User;

  getSystemUsers(): Observable<User[]> {
    throw new Error('Method not implemented.');
  }

  registerUser(registrationInfo): Observable<void> {
    return this.http.post<void>(this._registerUrl, registrationInfo);
  }

  prepareUserData(): any {
    if (this.isLoggedIn()) {
      this.getCurrentUser().subscribe(resUser => {
        this.currentUser = resUser;
      });
      this.pUserData().subscribe(uData => {
        this.profile = uData.profile;
        this.username = `${uData.profile.firstname}
        ${uData.profile.lastname}`;
      });
    }
  }

  refreshInfo(): any {
    if (this.isLoggedIn()) {
      this.pUserData().subscribe(uData => {
        this.profile = uData.profile;
        this.cart = uData.cart;
        this.cartItem = uData.cartItem;
      });
    }
  }

  pUserData(): Observable<UserData> {
    try {
      return this.http.get<UserData>(this._userDataURL);
    } catch (err) {
      this.errorsHandler.handleError(err);
    }
  }

  messageContact(messageForm: any): Observable<void> {
    try {
      return this.http.post<void>(this.contactUrl, messageForm);
    } catch (err) {
      this.errorsHandler.handleError(err);
    }
  }

  updateProfile(updateForm): Observable<Profile> {
    try {
      return this.http.put<Profile>(
        `${this._profileUrl}/userprofile/edit`,
        updateForm
      );
    } catch (error) {
      this.errorsHandler.handleError(error);
    }
  }

  getCurrentUser(): Observable<User> {
    try {
      return this.http.get<User>(`${this._userUrl}`);
    } catch (err) {
      this.errorsHandler.handleError(err);
    }
  }

  changeProfileImage(imageForm): Observable<Profile> {
    try {
      return this.http.patch<Profile>(this.imageChangeUrl, imageForm);
    } catch (err) {
      this.errorsHandler.handleError(err);
    }
  }

  addProfileImage(imageForm): Observable<Profile> {
    try {
      return this.http.post<Profile>(this.newImageUrl, imageForm);
    } catch (err) {
      this.errorsHandler.handleError(err);
    }
  }

  getUsers(): Observable<User[]> {
    try {
      return this.http.get<User[]>(this._usersURL);
    } catch (err) {
      this.errorsHandler.handleError(err);
    }
  }

  login(user: any): Observable<any> {
    try {
      return this.http.post<any>(this._loginUrl, user);
    } catch (err) {
      this.errorsHandler.handleError(err);
    }
  }

  getUserProfile(): Observable<Profile> {
    try {
      return this.http.get<Profile>(this._profileUrl);
    } catch (err) {
      this.errorsHandler.handleError(err);
    }
  }

  userLogout(): any {
    this.router.navigate(['/auth/login']);
    return localStorage.removeItem('token');
  }

  isLoggedIn(): any {
    return !!localStorage.getItem('token');
  }

  getToken(): any {
    return localStorage.getItem('token');
  }

}
