import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetGoods } from 'src/app/store/shop.actions';
import Shop from 'src/app/store/shop.state';

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

}
