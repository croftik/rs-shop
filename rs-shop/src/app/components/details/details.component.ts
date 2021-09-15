import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICategories, ISubCategoryName } from 'src/app/models/categories.model';
import { IGoodItem } from 'src/app/models/goods.model';
import { GoodService } from 'src/app/services/good/good.service';
import Shop from 'src/app/store/shop.state';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  currentGood$: Observable<IGoodItem[]>;

  currentCategory: string = '';

  currentSubCategory: string = '';

  constructor(private store: Store, public goodService: GoodService) {
    this.currentGood$ = this.store.select(Shop.details).pipe(
      map(data => data)
    );
  }

  ngOnInit() {
    this.currentCategory = this.store.selectSnapshot(Shop.currentCategory).name;
    this.currentSubCategory = this.store.selectSnapshot(Shop.currentSubCategory).ru;
  }
}
