import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportOfStatisticComponent } from './import-of-statistic.component';

describe('', () => {
  let component: ImportOfStatisticComponent;
  let fixture: ComponentFixture<ImportOfStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportOfStatisticComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportOfStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
