import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWarehouseModalComponent } from './add-warehouse-modal.component';

describe('AddWarehouseModalComponent', () => {
  let component: AddWarehouseModalComponent;
  let fixture: ComponentFixture<AddWarehouseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWarehouseModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWarehouseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
