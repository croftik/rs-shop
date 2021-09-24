import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPrice'
})
export class FormatPricePipe implements PipeTransform {

  transform(value: any): string {
    let result = String(value);
    if (result.includes('.')) return result;
    else return result + '.00';
  }

}
