import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageExpiredComponent } from './manage-expired.component';

describe('', () => {
  let component: ManageExpiredComponent;
  let fixture: ComponentFixture<ManageExpiredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageExpiredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageExpiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
