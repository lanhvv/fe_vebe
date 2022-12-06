import { TestBed } from '@angular/core/testing';

import { AccountCustomerService } from './account-customer.service';

describe('UnitService', () => {
  let service: AccountCustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountCustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
