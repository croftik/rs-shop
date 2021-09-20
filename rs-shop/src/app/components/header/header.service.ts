import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/models/user.model';
import { HttpService } from 'src/app/services/http/http.service';
import { SetLoginFormVisible, SetQueryParam, SetUserInfo } from 'src/app/store/shop.actions';
import Shop from 'src/app/store/shop.state';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  isExpandedPayment: boolean;

  statePayment: string;

  isExpandedContacts: boolean;

  stateContacts: string;

  isExpandedAccount: boolean;

  stateAccount: string;

  @Select(Shop.isLoginFormVisible)
  isLoginFormVisible$: Observable<boolean>;

  isUserLogged: boolean

  constructor(private router: Router, private httpService: HttpService, private store: Store) {
    this.isExpandedContacts = false;
    this.isExpandedPayment = false;
    this.isExpandedAccount = false;
    this.stateAccount = 'initialAccount';
    this.statePayment = 'initialPayment';
    this.stateContacts = 'initialContacts';
    this.isUserLogged = localStorage.getItem('user') ? true : false; 
  }

  showPayment() {
    this.isExpandedPayment = !this.isExpandedPayment;
    this.statePayment = this.isExpandedPayment ? 'expandedPayment' : 'initialPayment';
    if (this.isExpandedContacts) {
      this.isExpandedContacts = false;
      this.stateContacts = 'initialContacts';
    }
    else if (this.isExpandedAccount) {
      this.isExpandedAccount = false;
      this.stateAccount = 'initialContacts';
    }
  }

  showContacts() {
    this.isExpandedContacts = !this.isExpandedContacts;
    this.stateContacts = this.isExpandedContacts ? 'expandedContacts' : 'initialContacts';
    if (this.isExpandedPayment) {
      this.isExpandedPayment = false;
      this.statePayment = 'initialContacts';
    }
    else if (this.isExpandedAccount) {
      this.isExpandedAccount = false;
      this.stateAccount = 'initialContacts';
    }
  }

  showAccountInfo() {
    this.isExpandedAccount = !this.isExpandedAccount;
    this.stateAccount = this.isExpandedAccount ? 'expandedAccount' : 'initialAccount';
    if (this.isExpandedContacts) {
      this.isExpandedContacts = false;
      this.stateContacts = 'initialContacts';
    }
    else if (this.isExpandedPayment) {
      this.isExpandedPayment = false;
      this.statePayment = 'initialContacts';
    }
  }

  showLoginForm() {
    this.store.dispatch(new SetLoginFormVisible(true));
    if (this.isExpandedAccount) {
      this.isExpandedAccount = false;
      this.stateAccount = 'initialContacts';
    }
  }

  showShoppingCart() {
    localStorage.getItem('user') ? this.router.navigate(['order']) : this.store.dispatch(new SetLoginFormVisible(true));
  }

  navigateToMainPage() {
    this.router.navigate(['']);
  }

  navigateToFavourites() {
    localStorage.getItem('user') ? this.router.navigate(['favourites']) : this.store.dispatch(new SetLoginFormVisible(true));
  }

  navigateToWailList() {
    localStorage.getItem('user') ? this.router.navigate(['wait-list']) : this.store.dispatch(new SetLoginFormVisible(true));
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
    this.navigateToMainPage();
  }
}


