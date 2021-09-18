import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IGoodItem } from 'src/app/models/goods.model';
import Shop from 'src/app/store/shop.state';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { SetGoodId } from 'src/app/store/shop.actions';
import { GoodService } from 'src/app/services/good/good.service';

@Component({
  selector: 'app-one-good',
  templateUrl: './one-good.component.html',
  styleUrls: ['./one-good.component.scss']
})
export class OneGoodComponent implements OnInit {

  @Select(Shop.goods)
  goods$: Observable<IGoodItem[]>;

  category: string;

  subCategory: string;

  constructor(private store: Store, public goodService: GoodService, private activeRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.category = this.activeRoute.snapshot.params.category;
    this.subCategory = this.activeRoute.snapshot.params.good;
  }

  navigateToDetailsPage(good: IGoodItem) {
    this.store.dispatch(new SetGoodId(good.id));
    this.router.navigate([`${this.category}/${this.subCategory}/${good.id}`]);
  }
}
