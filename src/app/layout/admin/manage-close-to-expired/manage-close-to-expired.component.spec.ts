import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCloseToExpiredComponent } from './manage-close-to-expired.component';

describe('', () => {
  let component: ManageCloseToExpiredComponent;
  let fixture: ComponentFixture<ManageCloseToExpiredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCloseToExpiredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCloseToExpiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
