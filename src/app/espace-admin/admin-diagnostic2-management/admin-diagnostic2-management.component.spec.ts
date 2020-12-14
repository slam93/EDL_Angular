import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDiagnostic2ManagementComponent } from './admin-diagnostic2-management.component';

// @ts-ignore
describe('AdminDiagnostic2ManagementComponent', () => {
  let component: AdminDiagnostic2ManagementComponent;
  let fixture: ComponentFixture<AdminDiagnostic2ManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDiagnostic2ManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDiagnostic2ManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
