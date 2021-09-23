import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { IGoodItem } from 'src/app/models/goods.model';
import { IItems, IOrder } from 'src/app/models/user.model';
import { HttpService } from 'src/app/services/http/http.service';
import { SetEditOrderId } from 'src/app/store/shop.actions';
import Shop from 'src/app/store/shop.state';
import { WaitList } from 'src/app/utils/enums';
import { WaitListService } from './wait-list.service';

@Component({
  selector: 'app-wait-list',
  templateUrl: './wait-list.component.html',
  styleUrls: ['./wait-list.component.scss']
})
export class WaitListComponent implements OnInit, AfterViewChecked {

  waitList = WaitList;

  goodsInWaitList: IOrder[];

  items: Array<any> = [];

  constructor(private store: Store, public waitListService: WaitListService, private httpService: HttpService, private cdr: ChangeDetectorRef) { }

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

  ngAfterViewChecked() {
    this.cdr.detectChanges();
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

  setTotalPrice(id: string) {
    const allPrice = document.querySelectorAll(`.price_${id}`);
    let totalPrice = 0;
    allPrice.forEach(el => {
      totalPrice += +<string>el.textContent;
    });
    return totalPrice.toFixed(2);
  }

  onClickDeleteOrderBtn(good: IOrder) {
    this.waitListService.deleteOrder(good.id);
  }

  onClickEditOrderBtn(good: IOrder) {
    this.store.dispatch(new SetEditOrderId(good.id));
    this.waitListService.navigateToEditOrderForm();
  }

}
