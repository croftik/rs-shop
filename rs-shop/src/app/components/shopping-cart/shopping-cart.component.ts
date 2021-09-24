import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { IGoodItem } from 'src/app/models/goods.model';
import { IItems } from 'src/app/models/user.model';
import { FavouritesService } from 'src/app/services/favourites/favourites.service';
import { HttpService } from 'src/app/services/http/http.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
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
    private favouritesService: FavouritesService,
    private navService: NavigationService,
  ) { }

  ngOnInit() {
    this.cart = this.store.selectSnapshot(Shop.userInfo).cart;
    for (let i = 0; i < this.cart.length; i++) {
      this.httpService.getData(`goods/item/${this.cart[i]}`).subscribe((data:any) => {
        this.goods.push(data);
        this.totalCost += data.price;
        this.totalCost = +this.totalCost.toFixed(2);
      })
    }
  }

  onClickDeleteBtn(good: IGoodItem) {
    this.shoppingCartService.deleteGoodFromCart(good.id);
    this.totalCost -= - good.price;
    this.totalCost = +this.totalCost.toFixed(2);
  }

  onClickInFavourite(good: IGoodItem) {
    good.isFavorite ? this.navService.navigateToFavourites() : this.favouritesService.putGoodInFavourite(good.id);
  }

  onClickPlusBtn(good: IGoodItem) {
    const element = <HTMLElement>document.getElementById(`quantity_${good.id}`);
    const price = <HTMLElement>document.getElementById(`price_${good.id}`);
    this.totalCost += good.price;
    this.totalCost = +this.totalCost.toFixed(2);
    element.textContent = String(+<string>(element.textContent) + 1);
    price.textContent = String(good.price * (+element.textContent));
    this.store.dispatch(new SetTotalCost(+(this.totalCost.toFixed(2))));
  }

  onClickMinusBtn(good: IGoodItem) {
    const element = <HTMLElement>document.getElementById(`quantity_${good.id}`);
    const price = <HTMLElement>document.getElementById(`price_${good.id}`);
    if (+<string>element.textContent !== 0) {
      this.totalCost -= good.price;
      this.totalCost = +this.totalCost.toFixed(2);
      element.textContent = String(+<string>(element.textContent) - 1);
      price.textContent = String(+<string>(price.textContent) - good.price);
    }
    this.store.dispatch(new SetTotalCost(+(this.totalCost.toFixed(2))));
  }

  onClickConfirmBtn() {
    this.isOrderFormVisible = true;
    let good = document.querySelectorAll('.quantity');
    good.forEach(el => {
      const amount = +<string>(el.textContent);
      const [,id] = el.id.split('_');
      this.items.push({
        "id": id,
        "amount": amount
      })
    })
    this.store.dispatch(new SetItemsInCart(this.items));
    this.store.dispatch(new SetTotalCost(+(this.totalCost.toFixed(2))));
  }

}
