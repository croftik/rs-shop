import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { TableHeader } from 'src/app/utils/enums';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  tableHeader = TableHeader;

  good: any;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getData('goods/item/613466ecbe19adeb64f847e3').subscribe(data => {
      console.log(data);
      this.good = data;
    });
  }

}
