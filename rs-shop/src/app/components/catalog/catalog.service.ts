import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetCurrentCategory } from 'src/app/store/shop.actions';
import Shop from 'src/app/store/shop.state';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private store: Store) { }

  showSubCategories(event: Event) {
    const id = <string>(<HTMLElement>(event.target)).id.split('_')[1];
    const newCurrentCategory = this.store.selectSnapshot(Shop.categories).filter(category => category.id === id)[0];
    this.store.dispatch(new SetCurrentCategory(newCurrentCategory));
  }

}