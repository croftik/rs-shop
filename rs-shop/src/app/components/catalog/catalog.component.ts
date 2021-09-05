import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  mainCategories = ["Ноутбуки", "Холодильники", "Стиральные машины", "Смартфоны", "Морозильники", "Телевизоры", "Матрасы", "Диваны"];
  
  kitchen = ["Холодильники", "Вытяжки", "Кухонные плиты", "Посудомоечные машины", "Настольные плиты", "Морозильники", "Винные шкафы"];

  constructor() { }

  ngOnInit() {
  }

}
