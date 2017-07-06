import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinateMarkerComponent } from './coordinate-marker.component';

describe('CoordinateMarkerComponent', () => {
  let component: CoordinateMarkerComponent;
  let fixture: ComponentFixture<CoordinateMarkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordinateMarkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinateMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
