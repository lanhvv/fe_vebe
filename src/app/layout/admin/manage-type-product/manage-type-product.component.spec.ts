import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTypeProductComponent } from './manage-type-product.component';

describe('ManageTypeProductComponent', () => {
  let component: ManageTypeProductComponent;
  let fixture: ComponentFixture<ManageTypeProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTypeProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageTypeProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
