import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { HttpService } from 'src/app/services/http/http.service';
import { SetDirectionOfSort, SetSortingType } from 'src/app/store/shop.actions';
import Shop from 'src/app/store/shop.state';

@Injectable({
  providedIn: 'root'
})
export class GoodsService {

  constructor(private store: Store, private httpService: HttpService) {
  }

  setSortingSettingsInState(event: Event) {
    const typeOfSort = <string>(<HTMLElement>event.target).id;
    const directionOfSort = this.store.selectSnapshot(Shop.isUp);
    this.store.dispatch(new SetSortingType(typeOfSort));
    this.store.dispatch(new SetDirectionOfSort(!directionOfSort));
  }
}
