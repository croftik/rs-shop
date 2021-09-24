/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OrderFormService } from './order-form.service';

describe('Service: OrderForm', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderFormService]
    });
  });

  it('should ...', inject([OrderFormService], (service: OrderFormService) => {
    expect(service).toBeTruthy();
  }));
});
