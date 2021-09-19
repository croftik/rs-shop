import { Component, DoCheck, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { IGoodItem } from 'src/app/models/goods.model';
import { GoodService } from 'src/app/services/good/good.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
import Shop from 'src/app/store/shop.state';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, DoCheck {

  currentGood$: IGoodItem;

  currentCategory: string = '';

  currentSubCategory: string = '';

  constructor(private store: Store, public goodService: GoodService, private shoppingCartService: ShoppingCartService) {}

  ngOnInit() {
    this.currentCategory = this.store.selectSnapshot(Shop.currentCategory).name;
    this.currentSubCategory = this.store.selectSnapshot(Shop.currentSubCategory).name;
  }

  ngDoCheck() {
    this.currentGood$ = this.store.selectSnapshot(Shop.details);
  }

  onClickInCart(good: IGoodItem) {
    this.shoppingCartService.putGoodInCart(good.id);
  }

  onClickInFavourite(good: IGoodItem) {
    this.shoppingCartService.putGoodInFavourite(good.id);
  }

}
