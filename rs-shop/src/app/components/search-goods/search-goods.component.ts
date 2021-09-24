import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IGoodItem } from 'src/app/models/goods.model';
import Shop from 'src/app/store/shop.state';
import { SearchGoodsService } from './search-goods.service';

@Component({
  selector: 'app-search-goods',
  templateUrl: './search-goods.component.html',
  styleUrls: ['./search-goods.component.scss']
})
export class SearchGoodsComponent implements OnInit {

  @Select(Shop.searchResults)
  searchResults$: Observable<IGoodItem[]>

  constructor(public searchGoodsService: SearchGoodsService) { }

  ngOnInit() {
  }

}
