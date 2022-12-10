import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellPosComponent } from './sell-pos.component';

describe('SellPosComponent', () => {
  let component: SellPosComponent;
  let fixture: ComponentFixture<SellPosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellPosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellPosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
