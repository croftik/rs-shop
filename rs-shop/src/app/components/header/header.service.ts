import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { HttpService } from 'src/app/services/http/http.service';
import { SetQueryParam, SetSearchResults } from 'src/app/store/shop.actions';

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

  isLoginFormVisible: boolean;

  isUserLogged: boolean

  constructor(private router: Router, private httpService: HttpService, private store: Store) {
    this.isExpandedContacts = false;
    this.isExpandedPayment = false;
    this.isExpandedAccount = false;
    this.isLoginFormVisible = false;
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
    this.isLoginFormVisible = true;
    if (this.isExpandedAccount) {
      this.isExpandedAccount = false;
      this.stateAccount = 'initialContacts';
    }
  }

  showShoppingCart() {
    this.router.navigate(['order']);
  }

  navigateToMainPage() {
    this.router.navigate(['']);
  }

  navigateToFavourites() {
    this.router.navigate(['favourites']);
  }

  navigateToWailList() {
    this.router.navigate(['wait-list']);
  }

  searchGoods(value: string) {
    this.store.dispatch(new SetQueryParam(value));
  }

  hideLoginForm() {
    this.isLoginFormVisible = false;
  }

  changeImg() {
    this.isUserLogged = !this.isUserLogged;
  }

  signOut() {
    this.changeImg();
    localStorage.removeItem('user');
  }
}


