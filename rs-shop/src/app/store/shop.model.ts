import { ICategories } from "../models/categories.model";

export interface IState {
  categories: ICategories[],
  currentCategory: ICategories
}