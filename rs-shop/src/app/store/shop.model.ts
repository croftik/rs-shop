import { ICategories, ISubCategory } from "../models/categories.model";
import { IGoodItem } from "../models/goods.model";

export interface IState {
  categories: ICategories[],
  currentCategory: ICategories
  currentSubCategory: ISubCategory,
  goods: IGoodItem[],
  details: IGoodItem,
  isCatalogBtnPressed: boolean,
  searchResults: IGoodItem[],
  queryParam: string,
  goodId: string
}