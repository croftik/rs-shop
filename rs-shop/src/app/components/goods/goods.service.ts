import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { HttpService } from 'src/app/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class GoodsService {

  constructor(private store: Store, private httpService: HttpService) {
  }
}
