import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellOfflineComponent } from './sell-offline.component';

describe('SellOfflineComponent', () => {
  let component: SellOfflineComponent;
  let fixture: ComponentFixture<SellOfflineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellOfflineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellOfflineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
