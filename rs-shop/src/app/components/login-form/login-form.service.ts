import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { ISignInData, ISignUpData } from 'src/app/models/user.model';
import { HttpService } from 'src/app/services/http/http.service';
import { SetToken } from 'src/app/store/shop.actions';
import { HeaderService } from '../header/header.service';

@Injectable({
  providedIn: 'root'
})
export class LoginFormService {

  constructor(private httpService: HttpService, private headerService: HeaderService, private store: Store) { }

  register(signUpData: ISignUpData) {
    const token = this.createToken();
    this.httpService.postNewUser(signUpData, token).subscribe((data:any) => this.setToken(data.token));
    this.changeUI();
  }

  createToken(): string {
    return Math.random().toString(16);
  }

  login(signInData: ISignInData) {
    this.httpService.postUser(signInData).subscribe((data:any) => this.setToken(data.token));
    this.changeUI();
  }

  changeUI() {
    this.headerService.hideLoginForm();
    this.headerService.changeImg();
  }

  setToken(token: string) {
    localStorage.setItem('user', token);
    this.store.dispatch(new SetToken(token));
  }
}
