import { ICategories, ISubCategoryName } from "../models/categories.model";
import { IGoodItem } from "../models/goods.model";

export class SetCategories {
  static readonly type = 'shop categories';
  constructor(public categories: ICategories[]) {}
}

export class SetCurrentCategory {
  static readonly type = 'shop current category';
  constructor(public currentCategory: ICategories) {}
}

export class SetCurrentSubCategory {
  static readonly type = 'shop current subCategory';
  constructor(public currentSubCategory: ISubCategoryName) {}
}

export class SetGoods {
  static readonly type = 'shop goods';
  constructor(public goods: IGoodItem[]) {}
}

export class SetDetails {
  static readonly type = 'shop details';
  constructor(public details: IGoodItem[]) {}
}

export class SetCatalog {
  static readonly type = 'shop is catalog btn pressed';
  constructor(public isCatalogBtnPressed: boolean) {}
}