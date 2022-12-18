import { TestBed } from '@angular/core/testing';

import { StatisticSupplierService } from './statistic-supplier.service';

describe('ProductService', () => {
  let service: StatisticSupplierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatisticSupplierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
