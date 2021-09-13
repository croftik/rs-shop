import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatRating'
})
export class FormatRatingPipe implements PipeTransform {

  transform(value: number): string {
    let result = [];
    for (let star = 0; star < value; star++) {
      result.push('★');
    }
    if (value < 5) {
      for(let star = 0; star < 5 - value; star++) {
        result.push('☆');
      }
    }
    return result.join('');
  }

}
