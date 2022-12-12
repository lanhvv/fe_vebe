import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerWarehouseImportComponent } from './manager-warehouse-import.component';

describe('ManagerWarehouseImportComponent', () => {
  let component: ManagerWarehouseImportComponent;
  let fixture: ComponentFixture<ManagerWarehouseImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerWarehouseImportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerWarehouseImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
