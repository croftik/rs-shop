import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { SetLoginFormVisible, SetToken } from 'src/app/store/shop.actions';
import { GoodService } from '../good/good.service';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  token: string = <string>localStorage.getItem('user');

  constructor(private httpService: HttpService, private store: Store, private goodService: GoodService) { }

  putGoodInCart(id: string) {
    if (localStorage.getItem('user')) {
      this.httpService.postInCart(id).pipe(
        tap(data => {
          this.store.dispatch(new SetToken(this.token));
          this.goodService.updateGoodsInState();
        })
      ).subscribe();
    }
    else this.store.dispatch(new SetLoginFormVisible(true));
  }

  deleteGoodFromCart(id: string) {
    this.httpService.deleteGoodFromCart(id).pipe(
      tap(data => {
        this.store.dispatch(new SetToken(this.token));
        this.goodService.updateGoodsInState();
      })
    ).subscribe();
    document.getElementById(id)?.remove();
  }
}
