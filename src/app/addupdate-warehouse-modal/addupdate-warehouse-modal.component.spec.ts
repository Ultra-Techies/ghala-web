import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateWarehouseModalComponent } from './addupdate-warehouse-modal.component';

describe('AddUpdateWarehouseModalComponent', () => {
  let component: AddUpdateWarehouseModalComponent;
  let fixture: ComponentFixture<AddUpdateWarehouseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUpdateWarehouseModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateWarehouseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
