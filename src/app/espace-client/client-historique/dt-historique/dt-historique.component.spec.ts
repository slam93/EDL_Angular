import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtHistoriqueComponent } from './dt-historique.component';

describe('DtHistoriqueComponent', () => {
  let component: DtHistoriqueComponent;
  let fixture: ComponentFixture<DtHistoriqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtHistoriqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtHistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
