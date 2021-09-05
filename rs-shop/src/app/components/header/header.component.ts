import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  moreInfoPayment = ["Оплата", "Доставка", "Самовызов"];

  mainCategories = ["Все акции", "Товары к школе", "Ноутбуки", "Холодильники", "Стиральные машины", "Смартфоны", "Морозильники", "Телевизоры", "Матрасы", "Диваны"];

  isPaymentBlockVisible = false;

  isContactsVisible = false;

  isAccountVisible = false;
  constructor() {}

  ngOnInit() {
  }

}
