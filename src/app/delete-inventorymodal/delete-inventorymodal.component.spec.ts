import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteInventorymodalComponent } from './delete-inventorymodal.component';

describe('DeleteInventorymodalComponent', () => {
  let component: DeleteInventorymodalComponent;
  let fixture: ComponentFixture<DeleteInventorymodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteInventorymodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteInventorymodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
