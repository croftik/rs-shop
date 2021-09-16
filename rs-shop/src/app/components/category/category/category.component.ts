import { Component, DoCheck, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ICategories, ISubCategory } from 'src/app/models/categories.model';
import Shop from 'src/app/store/shop.state';
import { CatalogService } from '../../catalog/catalog.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements DoCheck {

  subCategories: ISubCategory[];

  category: ICategories;

  constructor(private store: Store, public catalogService: CatalogService) {
    this.category = this.store.selectSnapshot(Shop.currentCategory);
    this.subCategories = this.category.subCategories;
   }

  ngDoCheck() {
    this.category = this.store.selectSnapshot(Shop.currentCategory);
    this.subCategories = this.category.subCategories;
  }

}
