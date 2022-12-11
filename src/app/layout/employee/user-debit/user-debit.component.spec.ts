import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDebitComponent } from './user-debit.component';

describe('UserDebitComponent', () => {
  let component: UserDebitComponent;
  let fixture: ComponentFixture<UserDebitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDebitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDebitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
