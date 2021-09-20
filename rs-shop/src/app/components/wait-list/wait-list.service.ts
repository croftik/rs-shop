import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { IGoodItem } from 'src/app/models/goods.model';
import { HttpService } from 'src/app/services/http/http.service';
import { SetGoodId } from 'src/app/store/shop.actions';
import Shop from 'src/app/store/shop.state';

@Injectable({
  providedIn: 'root'
})
export class WaitListService {

  constructor(private httpService: HttpService, private store: Store) { }
}
