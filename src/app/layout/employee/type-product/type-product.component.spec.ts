import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeProductComponent } from './type-product.component';

describe('TypeProductComponent', () => {
  let component: TypeProductComponent;
  let fixture: ComponentFixture<TypeProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
