import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompSelectMarqueComponent } from './comp-select-marque.component';

describe('CompSelectMarqueComponent', () => {
  let component: CompSelectMarqueComponent;
  let fixture: ComponentFixture<CompSelectMarqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompSelectMarqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompSelectMarqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
