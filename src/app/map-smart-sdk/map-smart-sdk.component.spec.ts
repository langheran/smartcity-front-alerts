import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSmartSDKComponent } from './map-smart-sdk.component';

describe('MapSmartSDKComponent', () => {
  let component: MapSmartSDKComponent;
  let fixture: ComponentFixture<MapSmartSDKComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapSmartSDKComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapSmartSDKComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

