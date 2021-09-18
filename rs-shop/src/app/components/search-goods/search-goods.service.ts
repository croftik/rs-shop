import { Injectable } from '@angular/core';
import { SetGoodId } from 'src/app/store/shop.actions';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { IGoodItem } from 'src/app/models/goods.model';

@Injectable({
  providedIn: 'root'
})
export class SearchGoodsService {

  constructor(private store: Store, private router: Router) { }

  navigateToDetailsPage(good: IGoodItem) {
    this.store.dispatch(new SetGoodId(good.id)); 
    this.router.navigate([`${good.category}/${good.subCategory}/${good.id}`]);
  }

}
