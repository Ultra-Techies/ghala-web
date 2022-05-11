/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Inventory } from './inventory.component';

describe('TablesComponent', () => {
  let component: Inventory;
  let fixture: ComponentFixture<Inventory>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Inventory],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Inventory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
