import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSubscriptionManagementComponent } from './admin-subscription-management.component';

describe('AdminSubscriptionManagementComponent', () => {
  let component: AdminSubscriptionManagementComponent;
  let fixture: ComponentFixture<AdminSubscriptionManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSubscriptionManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSubscriptionManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
