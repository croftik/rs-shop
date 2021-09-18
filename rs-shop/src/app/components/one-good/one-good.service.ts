import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { IGoodItem } from 'src/app/models/goods.model';
import Shop from 'src/app/store/shop.state';

@Injectable({
  providedIn: 'root'
})
export class OneGoodService {

  constructor(private store: Store) { }

  getSortingGoods(goods: IGoodItem[]): IGoodItem[] {
    const direction = this.store.selectSnapshot(Shop.isUp);
    const typeOfSorting = this.store.selectSnapshot(Shop.typeOfSorting);
    const items = [...goods];
    if (direction) {
      switch (typeOfSorting) {
        case 'price': return items.sort(this.getSortingByPriceUp);
        case 'rating': return items.sort(this.getSortingByRatingUp);
        default: break;
      }
    } else {
      switch (typeOfSorting) {
        case 'price': return items.sort(this.getSortingByPriceDown);
        case 'rating': return items.sort(this.getSortingByRatingDown);
        default: break;
      }
    }
    return goods;
  }

  getSortingByPriceUp(a: IGoodItem, b: IGoodItem): number {
    return a.price - b.price;
  }

  getSortingByPriceDown(a: IGoodItem, b: IGoodItem): number {
    return b.price - a.price;
  }

  getSortingByRatingUp(a: IGoodItem, b: IGoodItem): number {
    return a.rating - b.rating;
  }

  getSortingByRatingDown(a: IGoodItem, b: IGoodItem): number {
    return b.rating - a.rating;
  }

  /**ERROR TypeError: Cannot assign to read only property '0' of object '[object Array]'
    at Array.sort (<anonymous>)
    at OneGoodService.getSortingGoods (one-good.service.ts:25) */
}
