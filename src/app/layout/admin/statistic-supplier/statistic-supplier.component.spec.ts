import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticSupplierComponent } from './statistic-supplier.component';

describe('', () => {
  let component: StatisticSupplierComponent;
  let fixture: ComponentFixture<StatisticSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticSupplierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
