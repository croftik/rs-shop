/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OrderEditService } from './order-edit.service';

describe('Service: OrderEdit', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderEditService]
    });
  });

  it('should ...', inject([OrderEditService], (service: OrderEditService) => {
    expect(service).toBeTruthy();
  }));
});
