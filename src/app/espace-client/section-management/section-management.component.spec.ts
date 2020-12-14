import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionManagementComponent } from './section-management.component';

describe('SectionManagementComponent', () => {
  let component: SectionManagementComponent;
  let fixture: ComponentFixture<SectionManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
