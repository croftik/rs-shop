import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { IGoodItem } from 'src/app/models/goods.model';
import { IItems } from 'src/app/models/user.model';
import { FavouritesService } from 'src/app/services/favourites/favourites.service';
import { HttpService } from 'src/app/services/http/http.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
import { SetItemsInCart, SetTotalCost } from 'src/app/store/shop.actions';
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

  cart: Array<string>;

  items: IItems[] = [];

  isOrderFormVisible: boolean = false;

  constructor (
    private httpService: HttpService, 
    private store: Store, 
    private shoppingCartService: ShoppingCartService, 
    private favouritesService: FavouritesService
  ) { }

  ngOnInit() {
    this.cart = this.store.selectSnapshot(Shop.userInfo).cart;
    for (let i = 0; i < this.cart.length; i++) {
      this.items.push({
        "id": this.cart[i],
        "amount": 1
      })
      this.httpService.getData(`goods/item/${this.cart[i]}`).subscribe((data:any) => {
        this.goods.push(data);
        this.totalCost += data.price;
      })
    }
    this.store.dispatch(new SetItemsInCart(this.items));
  }

  onClickDeleteBtn(good: IGoodItem) {
    this.shoppingCartService.deleteGoodFromCart(good.id);
    this.totalCost = this.totalCost - good.price;
  }

  onClickInFavourite(good: IGoodItem) {
    this.favouritesService.putGoodInFavourite(good.id);
  }

  onClickPlusBtn(good: IGoodItem) {
    const element = <HTMLElement>document.getElementById(`quantity_${good.id}`);
    const price = <HTMLElement>document.getElementById(`price_${good.id}`);
    this.totalCost += good.price; 
    element.textContent = String(+<string>(element.textContent) + 1);
    price.textContent = String(good.price * (+element.textContent));
    this.store.dispatch(new SetTotalCost(this.totalCost));
  }

  onClickMinusBtn(good: IGoodItem) {
    const element = <HTMLElement>document.getElementById(`quantity_${good.id}`);
    const price = <HTMLElement>document.getElementById(`price_${good.id}`);
    if (+<string>element.textContent !== 0) {
      this.totalCost -= good.price; 
      element.textContent = String(+<string>(element.textContent) - 1);
      price.textContent = String(+<string>(price.textContent) - good.price);
    }
    this.store.dispatch(new SetTotalCost(this.totalCost));
  }

  onClickConfirmBtn() {
    this.isOrderFormVisible = true;
    this.store.dispatch(new SetItemsInCart(this.items));
  }

}
