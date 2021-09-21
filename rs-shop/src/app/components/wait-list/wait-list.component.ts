import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { IGoodItem } from 'src/app/models/goods.model';
import { IItems, IOrder } from 'src/app/models/user.model';
import { HttpService } from 'src/app/services/http/http.service';
import Shop from 'src/app/store/shop.state';
import { WaitList } from 'src/app/utils/enums';
import { WaitListService } from './wait-list.service';

@Component({
  selector: 'app-wait-list',
  templateUrl: './wait-list.component.html',
  styleUrls: ['./wait-list.component.scss']
})
export class WaitListComponent implements OnInit {

  waitList = WaitList;

  goodsInWaitList: IOrder[];

  items: Array<any> = [];

  constructor(private store: Store, public waitListService: WaitListService, private httpService: HttpService) { }

  ngOnInit() {
    this.goodsInWaitList = this.store.selectSnapshot(Shop.userInfo).orders;
    this.goodsInWaitList.forEach((order:IOrder) => {
      order.items.forEach((items: IItems) => {
        this.httpService.getData(`goods/item/${items.id}`).subscribe(data => {
          this.items.push(data);
        });
      });
    });
  }

  setName(id: string): string {
    const item: IGoodItem = this.items.filter((items:IItems) => items.id === id)[0];
    if (item === undefined) return '';
    return item.name;
  }

  setSrc(id: string): string {
    const item: IGoodItem = this.items.filter((items:IItems) => items.id === id)[0];
    if (item === undefined) return '';
    return item.imageUrls[0];
  }

  setPrice(id:string, amount: number): number {
    const item: IGoodItem = this.items.filter((items:IItems) => items.id === id)[0];
    if (item === undefined) return 0;
    return item.price*amount;
  }

  onClickDeleteOrderBtn(good: IOrder) {
    this.waitListService.deleteOrder(good.id);
  }

}
