import { TestBed } from '@angular/core/testing';

import { WarehouseManagerService } from './warehouse-manager.service';

describe('WarehouseManagerService', () => {
  let service: WarehouseManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WarehouseManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
