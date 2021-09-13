/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GoodsService } from './goods.service';

describe('Service: Goods', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoodsService]
    });
  });

  it('should ...', inject([GoodsService], (service: GoodsService) => {
    expect(service).toBeTruthy();
  }));
});
