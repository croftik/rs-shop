import { Component, DoCheck, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IGoodItem } from 'src/app/models/goods.model';
import Shop from 'src/app/store/shop.state';
import { ActivatedRoute, Router } from '@angular/router';
import { SetGoodId, SetСountOfGoods } from 'src/app/store/shop.actions';
import { GoodService } from 'src/app/services/good/good.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
import { FavouritesService } from 'src/app/services/favourites/favourites.service';
import { map } from 'rxjs/operators';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-one-good',
  templateUrl: './one-good.component.html',
  styleUrls: ['./one-good.component.scss']
})
export class OneGoodComponent implements OnInit, DoCheck {

  @Select(Shop.goods)
  goods$: Observable<IGoodItem[]>;

  lengthOfData: number;

  category: string;

  subCategory: string;

  start: number = 0;

  last: number;

  isBtnVisible: boolean = false;

  constructor(
    private store: Store, 
    public goodService: GoodService, 
    private activeRoute: ActivatedRoute,
    private shoppingCartService: ShoppingCartService,
    private favouritesService: FavouritesService,
    private navService: NavigationService
  ) {}

  ngOnInit() {
    this.category = this.activeRoute.snapshot.params.category;
    this.subCategory = this.activeRoute.snapshot.params.good;
  }

  ngDoCheck() {
    this.lengthOfData = this.store.selectSnapshot(Shop.lengthOfData);
    this.last = this.store.selectSnapshot(Shop.countOfGoods);
  }

  navigateToDetailsPage(good: IGoodItem) {
    this.store.dispatch(new SetGoodId(good.id));
    this.navService.navigateToDetails(this.category, this.subCategory, good.id);
  }

  onClickInCart(good: IGoodItem) {
    good.isInCart ? this.navService.navigateToCart() : this.shoppingCartService.putGoodInCart(good.id);
  }

  onClickInFavourite(good: IGoodItem) {
    this.favouritesService.putGoodInFavourite(good.id);
  }

  onClickNext() {
    this.store.dispatch(new SetСountOfGoods(this.last+10));
  }
}
