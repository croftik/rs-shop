import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { SetToken } from 'src/app/store/shop.actions';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  token: string = <string>localStorage.getItem('user');

  constructor(private httpService: HttpService, private store: Store) { }

  putGoodInCart(id: string) {
    this.httpService.postInCart(id).pipe(
      tap(data => this.store.dispatch(new SetToken(this.token)))
    ).subscribe();
  }

  deleteGoodFromCart(id: string) {
    this.httpService.deleteGoodFromCart(id).pipe(
      tap(data => this.store.dispatch(new SetToken(this.token)))
    ).subscribe();
    document.getElementById(id)?.remove();
  }

  putGoodInFavourite(id: string) {
    this.httpService.postInFavourite(id).pipe(
      tap(data => this.store.dispatch(new SetToken(this.token)))
    ).subscribe();
  }

  deleteGoodFromFavourites(id: string) {
    this.httpService.deleteGoodFromFavourite(id).pipe(
      tap(data => this.store.dispatch(new SetToken(this.token)))
    ).subscribe();
    document.getElementById(id)?.remove();
  }
}
