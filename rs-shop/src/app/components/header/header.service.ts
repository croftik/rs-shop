import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  isExpandedPayment: boolean = false;

  statePayment: string = 'initialPayment';

  isExpandedContacts: boolean = false;

  stateContacts: string = 'initialContacts';

  isExpandedAccount: boolean = false;

  stateAccount: string = 'initialAccount';

  constructor() {}

  showPayment() {
    this.isExpandedPayment = !this.isExpandedPayment;
    this.statePayment = this.isExpandedPayment ? 'expandedPayment' : 'initialPayment';
  }

  showContacts() {
    this.isExpandedContacts = !this.isExpandedContacts;
    this.stateContacts = this.isExpandedContacts ? 'expandedContacts' : 'initialContacts';
  }

  showAccountInfo() {
    this.isExpandedAccount = !this.isExpandedAccount;
    this.stateAccount = this.isExpandedAccount ? 'expandedAccount' : 'initialAccount';
  }

}


