export interface ICategories {
  'id': string,
  'name': string,
  'subCategories': ISubCategories[]
}

export interface ISubCategories {
  'id': string,
  'name': string
}