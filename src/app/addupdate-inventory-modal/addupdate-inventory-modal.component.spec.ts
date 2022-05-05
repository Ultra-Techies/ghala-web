import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddupdateInventoryModalComponent } from './addupdate-inventory-modal.component';

describe('AddupdateInventoryModalComponent', () => {
  let component: AddupdateInventoryModalComponent;
  let fixture: ComponentFixture<AddupdateInventoryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddupdateInventoryModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddupdateInventoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
