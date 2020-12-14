import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MecanoAgendaComponent } from './mecano-agenda.component';

describe('MecanoAgendaComponent', () => {
  let component: MecanoAgendaComponent;
  let fixture: ComponentFixture<MecanoAgendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MecanoAgendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MecanoAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
