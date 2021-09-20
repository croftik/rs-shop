import { Injectable } from "@angular/core";
import { State, Action, StateContext, Selector } from "@ngxs/store";
import { HttpService } from "../services/http/http.service";
import { SetCatalog, SetCategories, SetCurrentCategory, SetCurrentSubCategory, SetDetails, SetDirectionOfSort, SetGoodId, SetGoods, SetItemsInCart, SetLengthOfGoods, SetLoginFormVisible, SetQueryParam, SetSearchResults, SetSortingType, SetToken, SetTotalCost, SetUserInfo, SetСountOfGoods } from "./shop.actions";
import { IState } from "./shop.model";
import { ICategories, ISubCategory } from "../models/categories.model";
import { IGoodItem } from "../models/goods.model";
import { map, tap } from "rxjs/operators";
import { initialState } from "../utils/utilities";
import { IItems, IUser } from "../models/user.model";

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
    return this.httpService.getData(`goods/category/${action.category}/${action.subCategory}`).pipe(
      tap((data:any) => {
        context.patchState({goods:data})
        context.dispatch(new SetLengthOfGoods(data.length));
      })
    );
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

  @Action(SetSortingType)
  setSortingType(context: StateContext<IState>, action: SetSortingType) {
    context.patchState({ typeOfSorting: action.sortingType });
  }

  @Selector()
  public static typeOfSorting(state: IState): string {
    return state.typeOfSorting;
  }

  @Action(SetDirectionOfSort)
  setDirectionOfSort(context: StateContext<IState>, action: SetDirectionOfSort) {
    context.patchState({ isUp: action.directionOfSort });
  }

  @Selector()
  public static isUp(state: IState): boolean {
    return state.isUp;
  }

  @Action(SetUserInfo)
  setUserInfo(context: StateContext<IState>, action: SetUserInfo) {
    context.patchState({ userInfo: action.userInfo });
  }

  @Selector()
  public static userInfo(state: IState): IUser {
    return state.userInfo;
  }

  @Action(SetToken)
  setToken(context: StateContext<IState>, action: SetToken) {
    context.patchState({ token: action.token });
    return this.httpService.getUserInfo().pipe(
      map((data:any) => context.dispatch(new SetUserInfo(data)))
    );
  }

  @Selector()
  public static token(state: IState): string {
    return state.token;
  }

  @Action(SetTotalCost)
  setTotalCost(context: StateContext<IState>, action: SetTotalCost) {
    context.patchState({ totalCost: action.totalCost });
  }

  @Selector()
  public static totalCost(state: IState): number {
    return state.totalCost;
  }

  @Action(SetItemsInCart)
  SetItemsInCart(context: StateContext<IState>, action: SetItemsInCart) {
    context.patchState({ cartItems: action.cartItems });
  }

  @Selector()
  public static cartItems(state: IState): IItems[] {
    return state.cartItems;
  }

  @Action(SetLoginFormVisible)
  SetLoginFormVisible(context: StateContext<IState>, action: SetLoginFormVisible) {
    context.patchState({ isLoginFormVisible: action.isLoginFormVisible });
  }

  @Selector()
  public static isLoginFormVisible(state: IState): boolean {
    return state.isLoginFormVisible;
  }

  @Action(SetLengthOfGoods)
  SetLengthOfGoods(context: StateContext<IState>, action: SetLengthOfGoods) {
    context.patchState({ lengthOfData: action.lengthOfData });
  }

  @Selector()
  public static lengthOfData(state: IState): number {
    return state.lengthOfData;
  }

  @Action(SetСountOfGoods)
  SetСountOfGoods(context: StateContext<IState>, action: SetСountOfGoods) {
    context.patchState({ countOfGoods: action.countOfGoods });
  }

  @Selector()
  public static countOfGoods(state: IState): number {
    return state.countOfGoods;
  }
}