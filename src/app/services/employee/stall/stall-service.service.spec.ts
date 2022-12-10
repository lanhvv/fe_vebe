import { TestBed } from '@angular/core/testing';

import { StallServiceService } from './stall-service.service';

describe('StallServiceService', () => {
  let service: StallServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StallServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
