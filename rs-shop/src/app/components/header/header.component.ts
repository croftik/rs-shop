import { Component, OnInit } from '@angular/core';
import IContacts from 'src/app/models/IContacts';
import { contacts } from 'src/app/utils/data';
import { AccountInfo, Payment } from 'src/app/utils/enums';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  mainCategories = ["Все акции", "Товары к школе", "Ноутбуки", "Холодильники", "Стиральные машины", "Смартфоны", "Морозильники", "Телевизоры", "Матрасы", "Диваны"];

  payment = Payment;

  isPaymentBlockVisible = false;

  isContactsVisible = false;

  isAccountVisible = true;

  contacts: IContacts[];

  accountInfo = AccountInfo;

  constructor() {
    this.contacts = contacts;
  }

  ngOnInit() {
  }

}
