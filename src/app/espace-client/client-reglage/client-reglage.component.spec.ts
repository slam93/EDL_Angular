import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientReglageComponent } from './client-reglage.component';

describe('ClientReglageComponent', () => {
  let component: ClientReglageComponent;
  let fixture: ComponentFixture<ClientReglageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientReglageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientReglageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
