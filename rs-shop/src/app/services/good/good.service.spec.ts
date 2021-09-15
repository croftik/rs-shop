/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GoodService } from './good.service';

describe('Service: Good', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoodService]
    });
  });

  it('should ...', inject([GoodService], (service: GoodService) => {
    expect(service).toBeTruthy();
  }));
});
