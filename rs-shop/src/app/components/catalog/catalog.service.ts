import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ICategories, ISubCategoryName } from 'src/app/models/categories.model';
import { HttpService } from 'src/app/services/http/http.service';
import { SetCatalog, SetCurrentCategory, SetCurrentSubCategory, SetGoods } from 'src/app/store/shop.actions';
import Shop from 'src/app/store/shop.state';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  subCategory: string = '';

  constructor(private store: Store, private router: Router, private httpService: HttpService) { }

  showSubCategories(event: Event) {
    const id = <string>(<HTMLElement>(event.target)).id.split('_')[1];
    const newCurrentCategory = this.store.selectSnapshot(Shop.categories).filter(category => category.id === id)[0];
    this.store.dispatch(new SetCurrentCategory(newCurrentCategory));
  }

  showAllGoodsInCategory(event: Event) {
    const category = <string>(<HTMLElement>(event.target)).id.split('_')[1];
    this.subCategory = '';
    this.store.dispatch(new SetCurrentSubCategory({
      'en': '', 
      'ru': ''
    }));
    this.setGoodsInState();
    this.putAwayCatalog();
    this.router.navigate([`${category}`]);
  }

  showAllGoodsInSubCategory(event: Event) {
    this.subCategory = <string>(<HTMLElement>(event.target)).id;
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
    if (this.subCategory === '') {
      this.httpService.getData(`goods/category/${newCurrentCategory.id}`).subscribe((data:any) => {
        this.store.dispatch(new SetGoods(data));
      });
    }
    else {
      this.httpService.getData(`goods/category/${newCurrentCategory.id}/${this.subCategory}`).subscribe((data:any) => {
        this.store.dispatch(new SetGoods(data));
      });
    }
  }

  putAwayCatalog() {
    this.store.dispatch(new SetCatalog(false));
  }

}