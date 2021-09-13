import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OneGoodService {

  constructor() { }

  setColor(availableAmount: number): string {
    if (availableAmount > 20) return 'green';
    else if (availableAmount > 5 && availableAmount < 19) return 'blue';
    return 'red';
  }

}
