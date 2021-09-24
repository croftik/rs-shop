import { Injectable } from '@angular/core';
import { SetGoodId } from 'src/app/store/shop.actions';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { IGoodItem } from 'src/app/models/goods.model';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Injectable({
  providedIn: 'root'
})
export class SearchGoodsService {

  constructor(private store: Store, private navService: NavigationService) { }

  navigateToDetailsPage(good: IGoodItem) {
    this.store.dispatch(new SetGoodId(good.id)); 
    this.navService.navigateToDetails(good.category, good.subCategory, good.id);
  }

}
