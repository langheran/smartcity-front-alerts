import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertTypeComponent } from './alert-type.component';

describe('AlertTypeComponent', () => {
  let component: AlertTypeComponent;
  let fixture: ComponentFixture<AlertTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
