import { ICategories, ISubCategory } from "../models/categories.model";
import { IGoodItem } from "../models/goods.model";
import { IItems, IUser } from "../models/user.model";

export interface IState {
  categories: ICategories[],
  currentCategory: ICategories
  currentSubCategory: ISubCategory,
  goods: IGoodItem[],
  details: IGoodItem,
  isCatalogBtnPressed: boolean,
  searchResults: IGoodItem[],
  queryParam: string,
  goodId: string,
  typeOfSorting: string,
  isUp: boolean,
  userInfo: IUser,
  token: string,
  totalCost: number,
  cartItems: IItems[]
}