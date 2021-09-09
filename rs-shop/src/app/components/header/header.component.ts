import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import IContacts from 'src/app/models/contacts.model';
import { contacts } from 'src/app/utils/data';
import { AccountInfo, Payment } from 'src/app/utils/enums';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
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
    trigger('accountBlock', [
      state('initialAccount', style({ filter: 'opacity(1)' })),
      state('expandedAccount', style({ filter: 'opacity(0.5)' })),
    ]),
    trigger('arrowAccount', [
      state('initialAccount', style({ transform: '0' })),
      state('expandedAccount', style({ transform: 'rotateX(180deg)' })),
    ]),
    trigger('catalog', [
      state('initialCatalog', style({ filter: 'opacity(1)' })),
      state('expandedCatalog', style({ filter: 'opacity(0.5)' })),
    ]),
  ],
})
export class HeaderComponent implements OnInit {
  mainCategories = ["Все акции", "Товары к школе", "Ноутбуки", "Холодильники", "Стиральные машины", "Смартфоны", "Морозильники", "Телевизоры", "Матрасы", "Диваны"];

  payment = Payment;

  contacts: IContacts[];

  accountInfo = AccountInfo;

  constructor(public headerService: HeaderService) {
    this.contacts = contacts;
  }

  ngOnInit() {
  }
}
