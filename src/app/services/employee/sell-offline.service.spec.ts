import { TestBed } from '@angular/core/testing';

import { SellOfflineService } from './sell-offline.service';

describe('SellOfflineService', () => {
  let service: SellOfflineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellOfflineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
