import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { SetLoginFormVisible, SetToken } from 'src/app/store/shop.actions';
import { GoodService } from '../good/good.service';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  token: string = <string>localStorage.getItem('user');

  constructor(private httpService: HttpService, private store: Store, private goodService: GoodService) { }

  putGoodInFavourite(id: string) {
    if (localStorage.getItem('user')) {
      this.httpService.postInFavourite(id).pipe(
        tap(() => {
          this.store.dispatch(new SetToken(this.token));
          this.goodService.updateGoodsInState();
        })
      ).subscribe();
    }
    else this.store.dispatch(new SetLoginFormVisible(true));    
  }

  deleteGoodFromFavourites(id: string) {
    this.httpService.deleteGoodFromFavourite(id).pipe(
      tap(() => {
        this.store.dispatch(new SetToken(this.token));
        this.goodService.updateGoodsInState();
      })
    ).subscribe();
    document.getElementById(id)?.remove();
  }

}
