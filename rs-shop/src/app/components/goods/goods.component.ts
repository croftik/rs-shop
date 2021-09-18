import { Component, DoCheck, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICategories, ISubCategoryName } from 'src/app/models/categories.model';
import { IGoodItem } from 'src/app/models/goods.model';
import Shop from 'src/app/store/shop.state';
import { GoodsService } from './goods.service';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.scss']
})
export class GoodsComponent implements OnInit, DoCheck {

  category: ICategories;

  categoryName: string = '';

  subCategory: ISubCategoryName;

  constructor(public goodsService: GoodsService, private store: Store) {}

  ngOnInit() {
    this.category = this.store.selectSnapshot(Shop.currentCategory);
    this.categoryName = this.category.name;
    this.subCategory = this.store.selectSnapshot(Shop.currentSubCategory);    
  }

  ngDoCheck() {
    this.category = this.store.selectSnapshot(Shop.currentCategory);
    this.categoryName = this.category.name;
    this.subCategory = this.store.selectSnapshot(Shop.currentSubCategory);
  }

}
