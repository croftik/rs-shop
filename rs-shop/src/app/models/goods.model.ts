export interface IGoodItem {
  "id": string,
  "name": string,
  "imageUrls": [string],
  "rating": number,
  "availableAmount": number,
  "price": number, 
  "description": string,
  "isInCart": boolean
  "isFavorite": boolean
}

interface IElectronics {
  "mobile": IGoodItem[],
  "watches": IGoodItem[],
  "tablets": IGoodItem[],
  "ebooks": IGoodItem[],
  "powerbanks": IGoodItem[],
  "cameras": IGoodItem[],
  "tvs": IGoodItem[],
  "headphones": IGoodItem[]
}

interface IHobbies {
  "music-instruments": IGoodItem[],
  "books": IGoodItem[],
  "fun-and-rest": IGoodItem[],
}

interface IFurniture {
  "sofas": IGoodItem[],
  "armchairs": IGoodItem[],
  "cabinets": IGoodItem[],
  "chairs": IGoodItem[],
  "tables": IGoodItem[],
  "beds": IGoodItem[],
}

interface IComputers {
  "laptops": IGoodItem[],
  "computers": IGoodItem[],
  "consoles": IGoodItem[],
  "hardware": IGoodItem[],
  "peripherals": IGoodItem[],
  "monitors": IGoodItem[],
}

interface IAppliances {
  "refrigerators": IGoodItem[],
  "cookers": IGoodItem[],
  "dishwashers": IGoodItem[],
  "freezers": IGoodItem[],
  "microwaves": IGoodItem[],
  "teapots": IGoodItem[],
  "washing-machines": IGoodItem[],
  "irons": IGoodItem[],
  "vacuum": IGoodItem[]
}

export interface IGoods {
  "appliances": IAppliances
  "electronics": IElectronics,
  "computers-peripherals": IComputers,
  "furniture": IFurniture,
  "hobbies": IHobbies
}