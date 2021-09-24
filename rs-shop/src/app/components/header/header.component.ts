import { state, style, trigger } from '@angular/animations';
import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { ICategories } from 'src/app/models/categories.model';
import IContacts from 'src/app/models/contacts.model';
import { GoodService } from 'src/app/services/good/good.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { SetCatalog } from 'src/app/store/shop.actions';
import Shop from 'src/app/store/shop.state';
import { contacts } from 'src/app/utils/data';
import { AccountInfo, Payment } from 'src/app/utils/enums';
import { CatalogService } from '../catalog/catalog.service';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('accountBlock', [
      state('initialAccount', style({ filter: 'opacity(1)' })),
      state('expandedAccount', style({ filter: 'opacity(0.5)' })),
    ]),
    trigger('arrowAccount', [
      state('initialAccount', style({ transform: '0' })),
      state('expandedAccount', style({ transform: 'rotateX(180deg)' })),
    ]),
    trigger('catalog', [
      state('initialCatalog', style({ filter: 'opacity(1)' })),
      state('expandedCatalog', style({ filter: 'opacity(0.5)' })),
    ]),
  ],
})
export class HeaderComponent implements OnInit, DoCheck, OnDestroy {
  mainCategories$: Observable<ICategories[]>;

  accountInfo = AccountInfo;

  formForSearchGoods: FormGroup;

  isCatalogBtnPressed: boolean;

  numberOfGoodsInShoppingCart: number;

  numberOfFavourites: number;

  numberOfGoodsInWaitingList: number

  private unsubscribe$ = new Subject();

  isSearchResults: boolean;

  constructor(
    public headerService: HeaderService, 
    public goodService: GoodService, 
    private store: Store, 
    public catalogService: CatalogService, 
    public navService: NavigationService
  ) {
  }

  ngOnInit() {
    this.formForSearchGoods = new FormGroup({
      searchInput: new FormControl('', Validators.required),
    });

    this.mainCategories$ = this.store.select(Shop.categories).pipe(
      map(categories => categories)
    );
    
    this.formForSearchGoods.controls.searchInput.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.unsubscribe$),
    )
      .subscribe((value: string) => {
        if (value.length === 0) this.isSearchResults = false;
        if (value.length >= 2) {
          this.isSearchResults = true;
          this.headerService.searchGoods(value);
        }
      });
    this.isSearchResults = false;
  }

  showCatalog() {
    this.isCatalogBtnPressed = !this.isCatalogBtnPressed;
    this.store.dispatch(new SetCatalog(this.isCatalogBtnPressed));
  }

  onClickFavourites() {
    this.navService.navigateToFavourites();
  }

  onClickWaitList() {
    this.navService.navigateToWailList();
  }

  onClickCart() {
    this.navService.navigateToCart();
  }

  onClickLogo() {
    this.navService.navigateToMainPage();
  }

  ngDoCheck() {
    this.isCatalogBtnPressed = this.store.selectSnapshot(Shop.isCatalogBtnPressed);
    const userInfo = this.store.selectSnapshot(Shop.userInfo);
    if (userInfo.cart[0] === '') this.numberOfGoodsInShoppingCart = 0;
    else this.numberOfGoodsInShoppingCart = userInfo.cart.length;
    if (userInfo.favorites[0] === '') this.numberOfFavourites = 0;
    else this.numberOfFavourites = userInfo.favorites.length;
    if (!userInfo.orders[0] || !userInfo.orders[0].id) this.numberOfGoodsInWaitingList = 0;
    else this.numberOfGoodsInWaitingList = userInfo.orders.length;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
