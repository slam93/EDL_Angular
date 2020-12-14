import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSubscriberListComponent } from './admin-subscriber-list.component';

describe('AdminSubscriberListComponent', () => {
  let component: AdminSubscriberListComponent;
  let fixture: ComponentFixture<AdminSubscriberListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSubscriberListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSubscriberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
