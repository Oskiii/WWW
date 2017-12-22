import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginGoogleComponentComponent } from './login-google-component.component';

describe('LoginGoogleComponentComponent', () => {
  let component: LoginGoogleComponentComponent;
  let fixture: ComponentFixture<LoginGoogleComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginGoogleComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginGoogleComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
