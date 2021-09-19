import { Component, DoCheck, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IGoodItem } from 'src/app/models/goods.model';
import Shop from 'src/app/store/shop.state';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { SetGoodId } from 'src/app/store/shop.actions';
import { GoodService } from 'src/app/services/good/good.service';
import { OneGoodService } from './one-good.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-one-good',
  templateUrl: './one-good.component.html',
  styleUrls: ['./one-good.component.scss']
})
export class OneGoodComponent implements OnInit, DoCheck {

  goods$: Observable<IGoodItem[]>;

  category: string;

  subCategory: string;

  isBtnCartPressed: boolean;

  isBtnFavouritesPressed: boolean;

  constructor(
    private store: Store, 
    public goodService: GoodService, 
    private activeRoute: ActivatedRoute, 
    private router: Router, 
    private oneGoodService: OneGoodService,
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit() {
    this.category = this.activeRoute.snapshot.params.category;
    this.subCategory = this.activeRoute.snapshot.params.good;
    this.isBtnCartPressed = false;
    this.isBtnFavouritesPressed = false;
  }

  ngDoCheck() {
    this.goods$ = this.store.select(Shop.goods).pipe(
      map((good:IGoodItem[]) => this.oneGoodService.getSortingGoods(good)),
    );    
  }

  navigateToDetailsPage(good: IGoodItem) {
    this.store.dispatch(new SetGoodId(good.id));
    this.router.navigate([`${this.category}/${this.subCategory}/${good.id}`]);
  }

  onClickInCart(good: IGoodItem) {
    this.shoppingCartService.putGoodInCart(good.id);
  }

  onClickInFavourite(good: IGoodItem) {
    this.shoppingCartService.putGoodInFavourite(good.id);
  }
}
