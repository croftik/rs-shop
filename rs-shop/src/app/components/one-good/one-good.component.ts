import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IGoodItem } from 'src/app/models/goods.model';
import Shop from 'src/app/store/shop.state';
import { map } from 'rxjs/operators';
import { OneGoodService } from './one-good.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SetDetails } from 'src/app/store/shop.actions';
import { GoodService } from 'src/app/services/good/good.service';

@Component({
  selector: 'app-one-good',
  templateUrl: './one-good.component.html',
  styleUrls: ['./one-good.component.scss']
})
export class OneGoodComponent implements OnInit {

  goods$: Observable<IGoodItem[]>;

  category: string;

  subCategory: string;

  constructor(private store: Store, public goodService: GoodService, private activeRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.goods$ = this.store.select(Shop.goods).pipe(
      map(data => data)
    );
    this.category = this.activeRoute.snapshot.params.category;
    this.subCategory = this.activeRoute.snapshot.params.good;
  }

  openDetailsPage(event: Event) {
    const id = <string>(<HTMLElement>(event.target)).id.split('_')[1];
    this.store.select(Shop.goods).subscribe(data => {
      const currentGood = data.filter(element => element.id === id);
      this.store.dispatch(new SetDetails(currentGood));
    });
    this.router.navigate([`${this.category}/${this.subCategory}/${id}`]);
  }
}
