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

  constructor(private store: Store, private httpService: HttpService) {
  }
}
