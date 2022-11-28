import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUpdateAccountComponent } from './manage-update-account.component';

describe('ManageUpdateAccountComponent', () => {
  let component: ManageUpdateAccountComponent;
  let fixture: ComponentFixture<ManageUpdateAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageUpdateAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUpdateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
