import { Component, DoCheck, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ICategories } from 'src/app/models/categories.model';
import { HttpService } from 'src/app/services/http/http.service';
import { SetCategories, SetCurrentCategory } from 'src/app/store/shop.actions';
import Shop from 'src/app/store/shop.state';
import { map, tap } from 'rxjs/operators';
import { CatalogService } from './catalog.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit, DoCheck {

  mainCategories$?: Observable<ICategories[]>;

  currentCategory: any;

  currentSubCategories = [];
  
  constructor(public catalogService: CatalogService, private store: Store) {}

  ngOnInit() {
    this.mainCategories$ = this.store.select(Shop.categories).pipe(
      map((categories:ICategories[]) => categories)
    );    
  }

  ngDoCheck() {
    this.currentCategory = this.store.selectSnapshot(Shop.currentCategory);
  }
}
