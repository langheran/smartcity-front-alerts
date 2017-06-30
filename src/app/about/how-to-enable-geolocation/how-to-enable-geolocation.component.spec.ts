import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToEnableGeolocationComponent } from './how-to-enable-geolocation.component';

describe('HowToEnableGeolocationComponent', () => {
  let component: HowToEnableGeolocationComponent;
  let fixture: ComponentFixture<HowToEnableGeolocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowToEnableGeolocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowToEnableGeolocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
