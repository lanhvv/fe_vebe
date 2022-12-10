import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WereHouseManagerComponent } from './were-house-manager.component';

describe('WereHouseManagerComponent', () => {
  let component: WereHouseManagerComponent;
  let fixture: ComponentFixture<WereHouseManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WereHouseManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WereHouseManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
