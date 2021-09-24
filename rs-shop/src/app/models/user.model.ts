export interface ISignUpData {
  "firstName": string,
  "lastName": string,
  "login": string,
  "password": string
}

export interface ISignInData {
  "login": string,
  "password": string,
}

export interface IUser {
  "firstName": string,
  "lastName": string,
  "cart": [string],
  "favorites": [string],
  "orders": [IOrder]
}

export interface IOrder {
  "items": [IItems],
  "details": IDetails,
  "id": string
}

export interface IItems {
  "id": string,
  "amount": number
}

export interface IDetails {
  "name": string,
  "address": string,
  "phone": string,
  "timeToDeliver": string,
  "comment": string
}
