import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { HttpService } from 'src/app/services/http/http.service';
import { SetDirectionOfSort, SetGoods, SetSortingType } from 'src/app/store/shop.actions';
import Shop from 'src/app/store/shop.state';

@Injectable({
  providedIn: 'root'
})
export class GoodsService {
  categoryId: string;

  subCategoryId: string;

  typeOfSort: string;

  directionOfSort: boolean;

  constructor(private store: Store) {
  }

  setSortingSettingsInState(event: Event) {
    this.typeOfSort = <string>(<HTMLElement>event.target).id;
    this.directionOfSort = this.store.selectSnapshot(Shop.isUp);
    this.setId();
    this.dispatchData();
  }

  dispatchData() {
    this.store.dispatch(new SetSortingType(this.typeOfSort));
    this.store.dispatch(new SetDirectionOfSort(!this.directionOfSort));
    this.store.dispatch(new SetGoods(this.categoryId, this.subCategoryId));
  }

  setId() {
    this.categoryId = this.store.selectSnapshot(Shop.currentCategory).id;
    this.subCategoryId = this.store.selectSnapshot(Shop.currentSubCategory).id;
  }
}
