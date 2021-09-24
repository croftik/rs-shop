import { Component, DoCheck, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { map } from 'rxjs/operators';
import { IGoodItem } from 'src/app/models/goods.model';
import { HttpService } from 'src/app/services/http/http.service';
import Shop from 'src/app/store/shop.state';

@Component({
  selector: 'app-popular-goods',
  templateUrl: './popular-goods.component.html',
  styleUrls: ['./popular-goods.component.scss']
})
export class PopularGoodsComponent implements OnInit {

  popularGood: any;

  mainCategories$: any;

  array: IGoodItem[];

  constructor(private httpService: HttpService, private store: Store) { }

  ngOnInit() {
    // this.httpService.getData('goods/category/appliances').pipe(
    //   map((data:any) => {
    //     return data.filter((item:any) => item.rating === 5)
    //   })
    // )
    // .subscribe(data => {
    //   this.popularGood = data;
    // });
  }
}
