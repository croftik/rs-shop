import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetCatalog } from 'src/app/store/shop.actions';
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

  isLoginFormVisible: boolean;

  constructor() {
    this.isExpandedContacts = false;
    this.isExpandedPayment = false;
    this.isExpandedAccount = false;
    this.isLoginFormVisible = false;
    this.stateAccount = 'initialAccount';
    this.statePayment = 'initialPayment';
    this.stateContacts = 'initialContacts';
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
}


