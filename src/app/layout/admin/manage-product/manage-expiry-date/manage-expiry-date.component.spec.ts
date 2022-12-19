import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageExpiryDateComponent } from './manage-expiry-date.component';

describe('ManageExpiryDateComponent', () => {
  let component: ManageExpiryDateComponent;
  let fixture: ComponentFixture<ManageExpiryDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageExpiryDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageExpiryDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
