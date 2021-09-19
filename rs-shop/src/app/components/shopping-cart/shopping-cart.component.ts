import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { IGoodItem } from 'src/app/models/goods.model';
import { HttpService } from 'src/app/services/http/http.service';
import Shop from 'src/app/store/shop.state';
import { TableHeader } from 'src/app/utils/enums';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  tableHeader = TableHeader;

  goods: Array<IGoodItem> = [];

  totalCost: number = 0;

  constructor(private httpService: HttpService, private store: Store) { }

  ngOnInit() {
    const cart = this.store.selectSnapshot(Shop.userInfo).cart;
    for (let i = 0; i < cart.length; i++) {
      this.httpService.getData(`goods/item/${cart[i]}`).subscribe((data:any) => {
        this.goods.push(data);
        this.totalCost += data.price;
      })
    }
  }
}
