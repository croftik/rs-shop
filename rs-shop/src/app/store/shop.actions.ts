import { ICategories, ISubCategory } from "../models/categories.model";
import { IGoodItem } from "../models/goods.model";
import { IItems, IOrder, IUser } from "../models/user.model";

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
  constructor(public currentSubCategory: ISubCategory) {}
}

export class SetGoods {
  static readonly type = 'shop goods';
  constructor(public category: string, public subCategory: string) {}
}

export class SetDetails {
  static readonly type = 'shop details';
  constructor(public details: IGoodItem) {}
}

export class SetCatalog {
  static readonly type = 'shop is catalog btn pressed';
  constructor(public isCatalogBtnPressed: boolean) {}
}

export class SetSearchResults {
  static readonly type = 'shop search results';
  constructor(public searchResults: IGoodItem[]) {}
}

export class SetQueryParam {
  static readonly type = 'shop query parameter';
  constructor(public queryParam: string) {}
}

export class SetGoodId {
  static readonly type = 'shop good id';
  constructor(public goodId: string) {}
}

export class SetSortingType {
  static readonly type = 'shop sort';
  constructor(public sortingType: string) {}
}

export class SetDirectionOfSort {
  static readonly type = 'shop sorting direction';
  constructor(public directionOfSort: boolean) {}
}

export class SetUserInfo {
  static readonly type = 'shop user';
  constructor(public userInfo: IUser) {}
}

export class SetToken {
  static readonly type = 'shop token';
  constructor(public token: string) {}
}

export class SetTotalCost {
  static readonly type = 'shop total cost';
  constructor(public totalCost: number) {}
}

export class SetItemsInCart {
  static readonly type = 'shop items in cart';
  constructor(public cartItems: IItems[]) {}
}

export class SetLoginFormVisible {
  static readonly type = 'shop login form';
  constructor(public isLoginFormVisible: boolean) {}
}

export class SetLengthOfGoods {
  static readonly type = 'shop length';
  constructor(public lengthOfData: number) {}
}

export class SetСountOfGoods {
  static readonly type = 'shop count';
  constructor(public countOfGoods: number) {}
}

export class SetEditOrder {
  static readonly type = 'shop edit order';
  constructor(public editOrder: IOrder) {}
}

export class SetEditOrderId {
  static readonly type = 'shop edit order id';
  constructor(public editOrderId: string) {}
}