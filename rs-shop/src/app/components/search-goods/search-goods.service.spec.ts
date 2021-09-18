/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SearchGoodsService } from './search-goods.service';

describe('Service: SearchGoods', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchGoodsService]
    });
  });

  it('should ...', inject([SearchGoodsService], (service: SearchGoodsService) => {
    expect(service).toBeTruthy();
  }));
});
