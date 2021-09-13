import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { SetCurrentCategory, SetCurrentSubCategory } from 'src/app/store/shop.actions';
import Shop from 'src/app/store/shop.state';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private store: Store, private router: Router) { }

  showSubCategories(event: Event) {
    const id = <string>(<HTMLElement>(event.target)).id.split('_')[1];
    const newCurrentCategory = this.store.selectSnapshot(Shop.categories).filter(category => category.id === id)[0];
    this.store.dispatch(new SetCurrentCategory(newCurrentCategory));
  }

  showGoods() {
    this.router.navigate(['categories']);
  }

  setSubCategory(event: Event) {
    const enName = <string>(<HTMLElement>(event.target)).id;
    const ruName = <string>(<HTMLElement>(event.target)).textContent;
    this.store.dispatch(new SetCurrentSubCategory({
      'en': enName, 
      'ru': ruName
    }));
    this.router.navigate(['categories']);    
  }

}