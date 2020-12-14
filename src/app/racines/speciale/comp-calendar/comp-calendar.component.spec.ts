import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompCalendarComponent } from './comp-calendar.component';

describe('CompCalendarComponent', () => {
  let component: CompCalendarComponent;
  let fixture: ComponentFixture<CompCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
