import { state, style, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import IContacts from 'src/app/models/contacts.model';
import { contacts } from 'src/app/utils/data';
import { Payment } from 'src/app/utils/enums';
import { HeaderService } from '../header/header.service';

@Component({
  selector: 'app-header-contacts',
  templateUrl: './header-contacts.component.html',
  styleUrls: ['./header-contacts.component.scss'],
  animations: [
    trigger('paymentBlock', [
      state('initialPayment', style({ filter: 'opacity(1)' })),
      state('expandedPayment', style({ filter: 'opacity(0.5)' })),
    ]),
    trigger('arrowPayment', [
      state('initialPayment', style({ transform: '0' })),
      state('expandedPayment', style({ transform: 'rotateX(180deg)' })),
    ]),
    trigger('contactsBlock', [
      state('initialContacts', style({ filter: 'opacity(1)' })),
      state('expandedContacts', style({ filter: 'opacity(0.5)' })),
    ]),
    trigger('arrowContacts', [
      state('initialContacts', style({ transform: '0' })),
      state('expandedContacts', style({ transform: 'rotateX(180deg)' })),
    ]),
  ],
})
export class HeaderContactsComponent implements OnInit {

  payment = Payment;

  contacts: IContacts[];

  isExpandedPayment: boolean;

  statePayment: string;

  isExpandedContacts: boolean;

  stateContacts: string;

  constructor(public headerService: HeaderService) {
    this.contacts = contacts;
    this.isExpandedContacts = false;
    this.isExpandedPayment = false;
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
    else if (this.headerService.isExpandedAccount) {
      this.headerService.isExpandedAccount = false;
      this.headerService.stateAccount = 'initialContacts';
    }
  }

  showContacts() {
    this.isExpandedContacts = !this.isExpandedContacts;
    this.stateContacts = this.isExpandedContacts ? 'expandedContacts' : 'initialContacts';
    if (this.isExpandedPayment) {
      this.isExpandedPayment = false;
      this.statePayment = 'initialContacts';
    }
    else if (this.headerService.isExpandedAccount) {
      this.headerService.isExpandedAccount = false;
      this.headerService.stateAccount = 'initialContacts';
    }
  }

  ngOnInit() {
  }

}
