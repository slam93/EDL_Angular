import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Diagnostic2Component } from './diagnostic2.component';

describe('Diagnostic2Component', () => {
  let component: Diagnostic2Component;
  let fixture: ComponentFixture<Diagnostic2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Diagnostic2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Diagnostic2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
