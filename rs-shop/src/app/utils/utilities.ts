import { IState } from "../store/shop.model";

export const initialState: IState = {
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
  goodId: '',
  typeOfSorting: 'rating',
  isUp: false,
  userInfo: {
    "firstName": '',
    "lastName": '',
    "cart": [''],
    "favorites": [''],
    "orders": [{
      "items": [{
        "id": '',
        "amount": 0
      }],
      "details": {
        "name": '',
        "address": '',
        "phone": '',
        "timeToDeliver": '',
        "comment": ''
      },
      "id": ''
    }]
  },
  token: '',
  totalCost: 0,
  cartItems: [],
  isLoginFormVisible: false,
  lengthOfData: 0,
  countOfGoods: 0,
  editOrder: {
    "items": [{
      "id": '',
      "amount": 0
    }],
    "details": {
      "name": '',
      "address": '',
      "phone": '',
      "timeToDeliver": '',
      "comment": ''
    },
    "id": ''
  },
  editOrderId: ''
}