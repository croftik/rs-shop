import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ICategories, ISubCategory } from 'src/app/models/categories.model';
import { HttpService } from 'src/app/services/http/http.service';
import { SetCatalog, SetCurrentCategory, SetCurrentSubCategory, SetGoods, SetСountOfGoods } from 'src/app/store/shop.actions';
import Shop from 'src/app/store/shop.state';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  subCategory: string = '';

  constructor(private store: Store, private router: Router, private httpService: HttpService) { }

  setNewCurrentCategory(newCategory: ICategories) {
    const newCurrentCategory = this.store.selectSnapshot(Shop.categories).filter(category => category.id === newCategory.id)[0];
    this.store.dispatch(new SetCurrentCategory(newCurrentCategory));
  }

  showSubCategoriesInCategory(category: ICategories) {
    this.setNewCurrentCategory(category);
    this.putAwayCatalog();
    this.router.navigate([`${category.id}`]);
  }

  showAllGoodsInSubCategory(subCategory: ISubCategory) {
    this.store.dispatch(new SetCurrentSubCategory(subCategory));
    const categoryId = this.store.selectSnapshot(Shop.currentCategory).id;
    this.putAwayCatalog();
    this.store.dispatch(new SetGoods(categoryId,subCategory.id));
    this.router.navigate([`${categoryId}/${subCategory.id}`]);
    this.store.dispatch(new SetСountOfGoods(10));
  }

  putAwayCatalog() {
    this.store.dispatch(new SetCatalog(false));
  }

}