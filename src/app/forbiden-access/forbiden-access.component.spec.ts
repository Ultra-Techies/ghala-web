import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForbidenAccessComponent } from './forbiden-access.component';

describe('ForbidenAccessComponent', () => {
  let component: ForbidenAccessComponent;
  let fixture: ComponentFixture<ForbidenAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForbidenAccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForbidenAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
