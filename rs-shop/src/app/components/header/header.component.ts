import { state, style, trigger } from '@angular/animations';
import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { ICategories } from 'src/app/models/categories.model';
import IContacts from 'src/app/models/contacts.model';
import { GoodService } from 'src/app/services/good/good.service';
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
    trigger('paymentBlock', [
      state('initialPayment', style({ filter: 'opacity(1)' })),
      state('expandedPayment', style({ filter: 'opacity(0.5)' })),
    ]),
    trigger('arrowPayment', [
      state('initialPayment', style({ transform: '0' })),
      state('expandedPayment', style({ transform: 'rotateX(180deg)' })),
    ]),
    trigger('contactsBlock', [
      state('initialContacts', style({ filter: 'opacity(1)' })),
      state('expandedContacts', style({ filter: 'opacity(0.5)' })),
    ]),
    trigger('arrowContacts', [
      state('initialContacts', style({ transform: '0' })),
      state('expandedContacts', style({ transform: 'rotateX(180deg)' })),
    ]),
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

  payment = Payment;

  contacts: IContacts[];

  accountInfo = AccountInfo;

  formForSearchGoods: FormGroup;

  isCatalogBtnPressed: boolean;

  numberOfGoodsInShoppingCart: number;

  numberOfFavourites: number;

  numberOfGoodsInWaitingList: number

  private unsubscribe$ = new Subject();

  constructor(public headerService: HeaderService, public goodService: GoodService, private store: Store, public catalogService: CatalogService) {
    this.contacts = contacts;
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
        if (value.length >= 2) this.headerService.searchGoods(value);
      });
  }

  showCatalog() {
    this.isCatalogBtnPressed = !this.isCatalogBtnPressed;
    this.store.dispatch(new SetCatalog(this.isCatalogBtnPressed));
  }

  onClickFavourites() {
    this.headerService.navigateToFavourites();
  }

  ngDoCheck() {
    this.isCatalogBtnPressed = this.store.selectSnapshot(Shop.isCatalogBtnPressed);
    const userInfo = this.store.selectSnapshot(Shop.userInfo);
    if (userInfo.cart[0] === '') this.numberOfGoodsInShoppingCart = 0;
    else this.numberOfGoodsInShoppingCart = userInfo.cart.length;
    if (userInfo.favorites[0] === '') this.numberOfFavourites = 0;
    else this.numberOfFavourites = userInfo.favorites.length;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
