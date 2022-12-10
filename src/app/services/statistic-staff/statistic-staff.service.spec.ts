import { TestBed } from '@angular/core/testing';

import { StatisticStaffService } from './statistic-staff.service';

describe('ProductService', () => {
  let service: StatisticStaffService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatisticStaffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
