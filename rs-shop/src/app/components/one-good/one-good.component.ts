import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IGoodItem } from 'src/app/models/goods.model';
import Shop from 'src/app/store/shop.state';
import { map } from 'rxjs/operators';
import { OneGoodService } from './one-good.service';

@Component({
  selector: 'app-one-good',
  templateUrl: './one-good.component.html',
  styleUrls: ['./one-good.component.scss']
})
export class OneGoodComponent implements OnInit {

  goods$: Observable<IGoodItem[]>

  constructor(private store: Store, public oneGoodService: OneGoodService) { 
    this.goods$ = this.store.select(Shop.goods).pipe(
      map(data => data)
    )
  }

  ngOnInit() {
  }

}
