/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OneGoodService } from './one-good.service';

describe('Service: OneGood', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OneGoodService]
    });
  });

  it('should ...', inject([OneGoodService], (service: OneGoodService) => {
    expect(service).toBeTruthy();
  }));
});
