import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAddAccountComponent } from './manage-add-account.component';

describe('ManageAddAccountComponent', () => {
  let component: ManageAddAccountComponent;
  let fixture: ComponentFixture<ManageAddAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAddAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAddAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
