import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDistributorComponent } from './detail-distributor.component';

describe('DetailDistributorComponent', () => {
  let component: DetailDistributorComponent;
  let fixture: ComponentFixture<DetailDistributorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailDistributorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailDistributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
