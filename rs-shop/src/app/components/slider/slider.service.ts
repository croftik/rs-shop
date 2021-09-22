import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { SetCurrentCategory, SetCurrentSubCategory, SetGoodId } from 'src/app/store/shop.actions';
import Shop from 'src/app/store/shop.state';
import { baseSrc } from 'src/app/utils/data';

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  constructor(private navService: NavigationService, private store: Store) { }

  openDetailsPage(event: Event) {
    const id = <string>(<HTMLElement>(event.target)).id;
    console.log(id)
    let categoryId: string = '';
    let subCategoryId: string  = '';
    let goodId: string = '';
    switch(id) {
      case `${baseSrc}atlant.jpeg`: 
        categoryId = 'appliances';
        subCategoryId = 'washing-machines';
        goodId = '612d518faa9d957045dd777d';
        break
      case `${baseSrc}ipad.png`: 
        categoryId = 'electronics';
        subCategoryId = 'tablets';
        goodId = '612e84904b6139dd597bf98c';
        break;
      case `${baseSrc}iphone.png`: 
        categoryId = 'electronics';
        subCategoryId = 'mobile';
        goodId = '612e05c5bc038caf8f07d5d3';
        break;
      case `${baseSrc}philips.jpg`:
        categoryId = 'appliances';
        subCategoryId = 'irons';
        goodId = '612dc212f250b3159299b294';
        break;
      case `${baseSrc}sofa.jpeg`:
        categoryId = 'furniture';
        subCategoryId = 'sofas';
        goodId = '61332c271c5747bf5e292364';
        break;
    }
    this.setInfoInState(categoryId, subCategoryId, goodId);
    this.navService.navigateToDetails(categoryId, subCategoryId, goodId);
  }

  setInfoInState(categoryId: string, subCategoryId: string, goodId: string) {
    const newCurrentCategory = this.store.selectSnapshot(Shop.categories).filter(category => category.id === categoryId)[0];
    this.store.dispatch(new SetCurrentCategory(newCurrentCategory));
    const newCurrentSubCategory = newCurrentCategory.subCategories.filter(sub => sub.id === subCategoryId)[0];
    this.store.dispatch(new SetCurrentSubCategory(newCurrentSubCategory));
    this.store.dispatch(new SetGoodId(goodId));
  }
}
