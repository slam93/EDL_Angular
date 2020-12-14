import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSectionManagementComponent } from './admin-section-management.component';

describe('AdminSectionManagementComponent', () => {
  let component: AdminSectionManagementComponent;
  let fixture: ComponentFixture<AdminSectionManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSectionManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSectionManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
