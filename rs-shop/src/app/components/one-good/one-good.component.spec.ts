/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OneGoodComponent } from './one-good.component';

describe('OneGoodComponent', () => {
  let component: OneGoodComponent;
  let fixture: ComponentFixture<OneGoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneGoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneGoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
