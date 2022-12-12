import { TestBed } from '@angular/core/testing';

import { ImportSupplierService } from './import-supplier.service';

describe('ImportSupplierService', () => {
  let service: ImportSupplierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImportSupplierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
