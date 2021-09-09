import { Injectable } from "@angular/core";
import { State, Action, StateContext, Selector } from "@ngxs/store";
import { HttpService } from "../services/http/http.service";
import { SetCategories, SetCurrentCategory } from "./shop.actions";
import { IState } from "./shop.model";
import { ICategories } from "../models/categories.model";

const initialState: IState = {
  categories: [],
  currentCategory: {
    id: '',
    name: '',
    subCategories: []
  }
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
}