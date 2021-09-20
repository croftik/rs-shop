import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { SetLoginFormVisible, SetToken } from 'src/app/store/shop.actions';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  token: string = <string>localStorage.getItem('user');

  constructor(private httpService: HttpService, private store: Store) { }

  putGoodInFavourite(id: string) {
    if (localStorage.getItem('user')) {
      this.httpService.postInFavourite(id).pipe(
        tap(data => this.store.dispatch(new SetToken(this.token)))
      ).subscribe();
    }
    else this.store.dispatch(new SetLoginFormVisible(true));    
  }

  deleteGoodFromFavourites(id: string) {
    this.httpService.deleteGoodFromFavourite(id).pipe(
      tap(data => this.store.dispatch(new SetToken(this.token)))
    ).subscribe();
    document.getElementById(id)?.remove();
  }

}
