import { TestBed } from '@angular/core/testing';

import { ManagerEmailService } from './manager-email.service';

describe('ManagerEmailService', () => {
  let service: ManagerEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
