import { Injectable } from "@angular/core";
import { State, Action, StateContext, Selector } from "@ngxs/store";
import { HttpService } from "../services/http/http.service";
import { SetCatalog, SetCategories, SetCurrentCategory, SetCurrentSubCategory, SetDetails, SetGoodId, SetGoods, SetQueryParam, SetSearchResults } from "./shop.actions";
import { IState } from "./shop.model";
import { ICategories, ISubCategory } from "../models/categories.model";
import { IGoodItem } from "../models/goods.model";
import { map } from "rxjs/operators";

const initialState: IState = {
  categories: [],
  currentCategory: {
    "id": '',
    "name": '',
    "subCategories": []
  },
  currentSubCategory: {
    "id": '',
    "name": ''
  },
  goods: [],
  details: {
    "id": '',
    "name": '',
    "imageUrls": [''],
    "rating": 0,
    "availableAmount": 0,
    "price": 0, 
    "description": '',
    "isInCart": false,
    "isFavorite": false,
    "category": '',
    "subCategory": ''
  },
  isCatalogBtnPressed: false,
  searchResults: [],
  queryParam: '',
  goodId: ''
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
    context.patchState({categories: action.categories});
  }

  @Selector()
  public static categories(state: IState): ICategories[] {
    return state.categories;
  }

  @Action(SetCurrentCategory)
  SetCurrentCategory(context : StateContext<IState>, action: SetCurrentCategory) {
    context.patchState({currentCategory: action.currentCategory});
  }

  @Selector()
  public static currentCategory(state: IState): ICategories {
    return state.currentCategory;
  }

  @Action(SetCurrentSubCategory)
  SetCurrentSubCategory(context : StateContext<IState>, action: SetCurrentSubCategory) {
    context.patchState({currentSubCategory: action.currentSubCategory});
  }

  @Selector()
  public static currentSubCategory(state: IState): ISubCategory {
    return state.currentSubCategory;
  }

  @Action(SetGoods)
  SetGoods(context : StateContext<IState>, action: SetGoods) {
    context.patchState({goods: action.goods});
  }

  @Selector()
  public static goods(state: IState): IGoodItem[] {
    return state.goods;
  }

  @Action(SetDetails)
  SetDetails(context : StateContext<IState>, action: SetDetails) {
    context.patchState({details: action.details});
  }

  @Selector()
  public static details(state: IState): IGoodItem {
    return state.details;
  }

  @Action(SetCatalog)
  SetCatalog(context : StateContext<IState>, action: SetCatalog) {
    context.patchState({isCatalogBtnPressed: action.isCatalogBtnPressed});
  }

  @Selector()
  public static isCatalogBtnPressed(state: IState): boolean {
    return state.isCatalogBtnPressed;
  }

  @Action(SetSearchResults)
  SetSearchResults(context : StateContext<IState>, action: SetSearchResults) {
    context.patchState({searchResults: action.searchResults});
  }

  @Selector()
  public static searchResults(state: IState): IGoodItem[] {
    return state.searchResults;
  }
  
  @Action(SetQueryParam)
  setQueryParam(context: StateContext<IState>, action: SetQueryParam) {
    context.patchState({queryParam: action.queryParam});
    return this.httpService.getData(`goods/search?text=${action.queryParam}`).pipe(
      map((goods: any) => context.dispatch(new SetSearchResults(goods))),
    );
  }

  @Selector()
  public static queryParam(state: IState): string {
    return state.queryParam;
  }

  @Action(SetGoodId)
  SetGoodId(context: StateContext<IState>, action: SetGoodId) {
    context.patchState({goodId: action.goodId});
    return this.httpService.getData(`goods/item/${action.goodId}`).pipe(
      map((good: any) => context.dispatch(new SetDetails(good))),
    );
  }

  @Selector()
  public static goodId(state: IState): string {
    return state.goodId;
  }
}