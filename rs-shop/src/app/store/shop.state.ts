import { Injectable } from "@angular/core";
import { State, Action, StateContext, Selector } from "@ngxs/store";
import { HttpService } from "../services/http/http.service";
import { SetCatalog, SetCategories, SetCurrentCategory, SetCurrentSubCategory, SetDetails, SetGoods } from "./shop.actions";
import { IState } from "./shop.model";
import { ICategories, ISubCategoryName } from "../models/categories.model";
import { IGoodItem } from "../models/goods.model";

const initialState: IState = {
  categories: [],
  currentCategory: {
    "id": '',
    "name": '',
    "subCategories": []
  },
  currentSubCategory: {
    "en": '',
    "ru": ''
  },
  goods: [],
  details: [],
  isCatalogBtnPressed: false
};

@State<IState>({
  name: 'Shop',
  defaults: initialState,
})

@Injectable()

export default class Shop {
  constructor(public httpService: HttpService) {}

  @Action(SetCategories)
  setCategories(context : StateContext<IState>, action: SetCategories) {
    context.patchState({categories: action.categories})
  }

  @Selector()
  public static categories(state: IState): ICategories[] {
    return state.categories;
  }

  @Action(SetCurrentCategory)
  SetCurrentCategory(context : StateContext<IState>, action: SetCurrentCategory) {
    context.patchState({currentCategory: action.currentCategory})
  }

  @Selector()
  public static currentCategory(state: IState): ICategories {
    return state.currentCategory;
  }

  @Action(SetCurrentSubCategory)
  SetCurrentSubCategory(context : StateContext<IState>, action: SetCurrentSubCategory) {
    context.patchState({currentSubCategory: action.currentSubCategory})
  }

  @Selector()
  public static currentSubCategory(state: IState): ISubCategoryName {
    return state.currentSubCategory;
  }

  @Action(SetGoods)
  SetGoods(context : StateContext<IState>, action: SetGoods) {
    context.patchState({goods: action.goods})
  }

  @Selector()
  public static goods(state: IState): IGoodItem[] {
    return state.goods;
  }

  @Action(SetDetails)
  SetDetails(context : StateContext<IState>, action: SetDetails) {
    context.patchState({details: action.details})
  }

  @Selector()
  public static details(state: IState): IGoodItem[] {
    return state.details;
  }

  @Action(SetCatalog)
  SetCatalog(context : StateContext<IState>, action: SetCatalog) {
    context.patchState({isCatalogBtnPressed: action.isCatalogBtnPressed})
  }

  @Selector()
  public static isCatalogBtnPressed(state: IState): boolean {
    return state.isCatalogBtnPressed;
  }
}