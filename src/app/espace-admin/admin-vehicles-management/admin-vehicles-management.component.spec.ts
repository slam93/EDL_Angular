import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVehiclesManagementComponent } from './admin-vehicles-management.component';

describe('AdminVehiclesManagementComponent', () => {
  let component: AdminVehiclesManagementComponent;
  let fixture: ComponentFixture<AdminVehiclesManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminVehiclesManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVehiclesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
