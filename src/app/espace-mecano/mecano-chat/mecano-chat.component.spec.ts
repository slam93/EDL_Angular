import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MecanoChatComponent } from './mecano-chat.component';

describe('MecanoChatComponent', () => {
  let component: MecanoChatComponent;
  let fixture: ComponentFixture<MecanoChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MecanoChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MecanoChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
