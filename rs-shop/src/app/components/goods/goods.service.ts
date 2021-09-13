import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { ICategories, ISubCategoryName } from 'src/app/models/categories.model';
import { HttpService } from 'src/app/services/http/http.service';
import { SetGoods } from 'src/app/store/shop.actions';
import Shop from 'src/app/store/shop.state';

@Injectable({
  providedIn: 'root'
})
export class GoodsService {

  category: ICategories;

  categoryName: string;

  subCategory: ISubCategoryName;

  isSubCategoryPressed?: boolean;

  constructor(private store: Store, private httpService: HttpService) {
    this.category = this.store.selectSnapshot(Shop.currentCategory);
    this.categoryName = this.category.name;
    this.subCategory = this.store.selectSnapshot(Shop.currentSubCategory);
  }

  setGoodsInState() {
    if (this.subCategory.en === '') {
      this.isSubCategoryPressed = false;
      this.httpService.getData(`goods/category/${this.category.id}`).subscribe((data:any) => {
        this.store.dispatch(new SetGoods(data));
      });
      
    }
    else {
      this.isSubCategoryPressed = true;
      this.httpService.getData(`goods/category/${this.category.id}/${this.subCategory.en}`).subscribe((data:any) => {
        this.store.dispatch(new SetGoods(data));
      });
    }
  }
}
