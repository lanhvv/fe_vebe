import { TestBed } from '@angular/core/testing';

import { CloseToExpiredService } from './close-to-expired.service';

describe('ProductService', () => {
  let service: CloseToExpiredService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloseToExpiredService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
