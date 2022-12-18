import { TestBed } from '@angular/core/testing';

import { ImportOfSupplierService } from './import-of-supplier.service';

describe('ProductService', () => {
  let service: ImportOfSupplierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImportOfSupplierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
