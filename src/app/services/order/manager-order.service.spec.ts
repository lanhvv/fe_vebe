import { TestBed } from '@angular/core/testing';

import { ManagerOrderService } from './manager-order.service';

describe('ManagerOrderService', () => {
  let service: ManagerOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
