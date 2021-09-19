import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { IGoodItem } from 'src/app/models/goods.model';
import { FavouritesService } from 'src/app/services/favourites/favourites.service';
import { HttpService } from 'src/app/services/http/http.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
import Shop from 'src/app/store/shop.state';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {

  goods: Array<IGoodItem> = [];
  
  constructor(private httpService: HttpService, private store: Store, private shoppingCartService: ShoppingCartService, private favouritesService: FavouritesService) { }

  ngOnInit() {
    const favorite = this.store.selectSnapshot(Shop.userInfo).favorites;
    for (let i = 0; i < favorite.length; i++) {
      this.httpService.getData(`goods/item/${favorite[i]}`).subscribe((data:any) => {
        this.goods.push(data);
      })
    }
  }

  onClickInCart(good: IGoodItem) {
    this.shoppingCartService.putGoodInCart(good.id);
  }

  onClickDeleteBtn(good: IGoodItem) {
    this.favouritesService.deleteGoodFromFavourites(good.id);
  }

}
