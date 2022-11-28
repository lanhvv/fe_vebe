import { TestBed } from '@angular/core/testing';

import { TypeProductService } from './type-product.service';

describe('ProductService', () => {
  let service: TypeProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
