import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompSelectModeleComponent } from './comp-select-modele.component';

describe('CompSelectModeleComponent', () => {
  let component: CompSelectModeleComponent;
  let fixture: ComponentFixture<CompSelectModeleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompSelectModeleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompSelectModeleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
