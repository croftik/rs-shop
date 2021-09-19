import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetToken } from 'src/app/store/shop.actions';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  token: string = <string>localStorage.getItem('user');

  constructor(private httpService: HttpService, private store: Store) { }

  putGoodInCart(id: string) {
    this.httpService.postInCart(id).subscribe(data => this.store.dispatch(new SetToken(this.token)));
  }

}
