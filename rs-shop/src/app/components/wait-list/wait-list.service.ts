import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { HttpService } from 'src/app/services/http/http.service';
import { SetToken } from 'src/app/store/shop.actions';

@Injectable({
  providedIn: 'root'
})
export class WaitListService {

  constructor(private httpService: HttpService, private store: Store) { }

  deleteOrder(id: string) {
    const token = <string>localStorage.getItem('user');
    this.httpService.deleteOrder(id).subscribe(data => this.store.dispatch(new SetToken(token)));
    document.getElementById(`${id}`)?.remove();
  }
}
