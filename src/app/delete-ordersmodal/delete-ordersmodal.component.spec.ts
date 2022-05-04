import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteOrdersmodalComponent } from './delete-ordersmodal.component';

describe('DeleteOrdersmodalComponent', () => {
  let component: DeleteOrdersmodalComponent;
  let fixture: ComponentFixture<DeleteOrdersmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteOrdersmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteOrdersmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
