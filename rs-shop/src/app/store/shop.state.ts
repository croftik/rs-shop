import { Injectable } from "@angular/core";
import { State, Action, StateContext, Selector } from "@ngxs/store";
import { HttpService } from "../services/http/http.service";
import { SetCategories } from "./shop.actions";
import { IState } from "./shop.model";
import { tap } from "rxjs/operators";

const initialState: IState = {
  categories: []
};

@State<IState>({
  name: 'Shop',
  defaults: initialState,
})

@Injectable()

export default class Shop {
  constructor(public httpService: HttpService) {}

  @Action(SetCategories)
  setCategories({ getState, patchState } : StateContext<IState>) {
    this.httpService.getData('categories').pipe(
      tap((result:any) => {
        const state = getState();
        patchState({
          ...state,
          categories: result
        });
      })
    );
  }

  @Selector()
  public static categories(state: IState): any {
    return state.categories;
  }
}