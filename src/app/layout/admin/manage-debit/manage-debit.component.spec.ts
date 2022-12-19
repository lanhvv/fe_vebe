import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDebitComponent } from './manage-debit.component';

describe('ManageDebitComponent', () => {
  let component: ManageDebitComponent;
  let fixture: ComponentFixture<ManageDebitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageDebitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageDebitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
