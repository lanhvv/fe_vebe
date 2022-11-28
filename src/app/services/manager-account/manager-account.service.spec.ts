import { TestBed } from '@angular/core/testing';

import { ManagerAccountService } from './manager-account.service';

describe('ManagerAccountService', () => {
  let service: ManagerAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
