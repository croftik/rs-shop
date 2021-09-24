import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/models/user.model';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { SetLoginFormVisible, SetQueryParam, SetUserInfo } from 'src/app/store/shop.actions';
import Shop from 'src/app/store/shop.state';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  isExpandedAccount: boolean;

  stateAccount: string;

  @Select(Shop.isLoginFormVisible)
  isLoginFormVisible$: Observable<boolean>;

  isUserLogged: boolean

  constructor(public navService: NavigationService, private store: Store) {
    this.isExpandedAccount = false;
    this.stateAccount = 'initialAccount';
    this.isUserLogged = localStorage.getItem('user') ? true : false; 
  }  

  showAccountInfo() {
    this.isExpandedAccount = !this.isExpandedAccount;
    this.stateAccount = this.isExpandedAccount ? 'expandedAccount' : 'initialAccount';
  }

  showLoginForm() {
    this.store.dispatch(new SetLoginFormVisible(true));
    if (this.isExpandedAccount) {
      this.isExpandedAccount = false;
      this.stateAccount = 'initialContacts';
    }
  }

  searchGoods(value: string) {
    this.store.dispatch(new SetQueryParam(value));
  }

  hideLoginForm() {
    this.store.dispatch(new SetLoginFormVisible(false));
  }

  changeImg() {
    this.isUserLogged = !this.isUserLogged;
  }

  signOut() {
    this.changeImg();
    localStorage.removeItem('user');
    const userInfo:IUser = {
      "firstName": '',
      "lastName": '',
      "cart": [''],
      "favorites": [''],
      "orders": [{
        "items": [{
          "id": '',
          "amount": 0
        }],
        "details": {
          "name": '',
          "address": '',
          "phone": '',
          "timeToDeliver": '',
          "comment": ''
        },
        "id": ''
      }]
    };
    this.store.dispatch(new SetUserInfo(userInfo));
    this.navService.navigateToMainPage();
  }
}


