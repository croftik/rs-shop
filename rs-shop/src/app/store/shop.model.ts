import { ICategories, ISubCategoryName } from "../models/categories.model";
import { IGoodItem } from "../models/goods.model";

export interface IState {
  categories: ICategories[],
  currentCategory: ICategories
  currentSubCategory: ISubCategoryName,
  goods: IGoodItem[],
  details: IGoodItem[],
  isCatalogBtnPressed: boolean
}