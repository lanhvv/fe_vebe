import { TestBed } from '@angular/core/testing';

import { DistributorService } from './distributor.service';

describe('ProductService', () => {
  let service: DistributorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistributorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
