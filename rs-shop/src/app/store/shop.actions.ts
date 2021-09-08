import { ICategories } from "../models/categories.model";

export class SetCategories {
  static readonly type = 'shop categories';
  constructor(public categories: any) {}
}