import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { HttpService } from 'src/app/services/http/http.service';
import { SetCatalog, SetCurrentCategory, SetCurrentSubCategory, SetGoods } from 'src/app/store/shop.actions';
import Shop from 'src/app/store/shop.state';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  subCategory: string = '';

  constructor(private store: Store, private router: Router, private httpService: HttpService) { }

  setNewCurrentCategory(event: Event) {
    const id = <string>(<HTMLElement>(event.target)).id.split('_')[1];
    const newCurrentCategory = this.store.selectSnapshot(Shop.categories).filter(category => category.id === id)[0];
    this.store.dispatch(new SetCurrentCategory(newCurrentCategory));
  }

  showSubCategoriesInCategory(event: Event) {
    const category = <string>(<HTMLElement>(event.target)).id.split('_')[1];
    this.setNewCurrentCategory(event);
    this.setGoodsInState();
    this.putAwayCatalog();
    this.router.navigate([`${category}`]);
  }

  showAllGoodsInSubCategory(event: Event) {
    this.subCategory = <string>(<HTMLElement>(event.target)).id.split('_')[1];
    const ruName = <string>(<HTMLElement>(event.target)).textContent;
    this.store.dispatch(new SetCurrentSubCategory({
      'en': this.subCategory, 
      'ru': ruName
    }));
    const category = this.store.selectSnapshot(Shop.currentCategory).id;
    this.setGoodsInState();
    this.putAwayCatalog();
    this.router.navigate([`${category}/${this.subCategory}`]);
  }

  setGoodsInState() {
    const newCurrentCategory = this.store.selectSnapshot(Shop.currentCategory);
    this.httpService.getData(`goods/category/${newCurrentCategory.id}/${this.subCategory}`).subscribe((data:any) => {
      this.store.dispatch(new SetGoods(data));
    });
  }

  putAwayCatalog() {
    this.store.dispatch(new SetCatalog(false));
  }

}