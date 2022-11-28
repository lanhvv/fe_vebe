import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangPassComponent } from './chang-pass.component';

describe('ChangPassComponent', () => {
  let component: ChangPassComponent;
  let fixture: ComponentFixture<ChangPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangPassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
