/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WaitListService } from './wait-list.service';

describe('Service: WaitList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WaitListService]
    });
  });

  it('should ...', inject([WaitListService], (service: WaitListService) => {
    expect(service).toBeTruthy();
  }));
});
