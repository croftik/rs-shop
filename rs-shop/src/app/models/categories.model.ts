export interface ICategories {
  'id': string,
  'name': string,
  'subCategories': ISubCategory[]
}

export interface ISubCategory {
  'id': string,
  'name': string
}

export interface ISubCategoryName {
  'ru': string,
  'en': string
}