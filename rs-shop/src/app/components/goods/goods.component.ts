import { Component, DoCheck, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ICategories, ISubCategory } from 'src/app/models/categories.model';
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

  subCategory: ISubCategory;

  constructor(public goodsService: GoodsService, private store: Store) {}

  ngOnInit() {  
  }

  ngDoCheck() {
    this.category = this.store.selectSnapshot(Shop.currentCategory);
    this.categoryName = this.category.name;
    this.subCategory = this.store.selectSnapshot(Shop.currentSubCategory);
  }

}
