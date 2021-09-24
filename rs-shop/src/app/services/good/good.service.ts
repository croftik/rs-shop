import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetGoods } from 'src/app/store/shop.actions';
import Shop from 'src/app/store/shop.state';
import { IGoodItem } from 'src/app/models/goods.model';

@Injectable({
  providedIn: 'root'
})
export class GoodService {

  categoryId: string;

  subCategoryId: string;

  constructor(private store: Store) { }

  setColor(availableAmount: number): string {
    if (availableAmount > 20) return 'green';
    else if (availableAmount > 5 && availableAmount < 19) return 'blue';
    return 'red';
  }

  
  updateGoodsInState() {
    this.categoryId = this.store.selectSnapshot(Shop.currentCategory).id;
    this.subCategoryId = this.store.selectSnapshot(Shop.currentSubCategory).id;
    this.store.dispatch(new SetGoods(this.categoryId, this.subCategoryId));
  }

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

}
