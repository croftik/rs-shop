import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { SetLoginFormVisible } from 'src/app/store/shop.actions';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router, private store: Store) { }

  navigateToMainPage() {
    this.router.navigate(['main']);
  }

  navigateToFavourites() {
    localStorage.getItem('user') ? this.router.navigate(['favourites']) : this.store.dispatch(new SetLoginFormVisible(true));
  }

  navigateToWailList() {
    localStorage.getItem('user') ? this.router.navigate(['wait-list']) : this.store.dispatch(new SetLoginFormVisible(true));
  }

  navigateToCart() {
    localStorage.getItem('user') ? this.router.navigate(['order']) : this.store.dispatch(new SetLoginFormVisible(true));
  }

  navigateToCategory(categoryId: string) {
    this.router.navigate([`${categoryId}`]);
  }

  navigateToSubCategory(categoryId: string, subCategoryId: string) {
    this.router.navigate([`${categoryId}/${subCategoryId}`]);
  }

  navigateToDetails(categoryId: string, subCategoryId: string, goodId: string) {
    this.router.navigate([`${categoryId}/${subCategoryId}/${goodId}`]);
  }

}
