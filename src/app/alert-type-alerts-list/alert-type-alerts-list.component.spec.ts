import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertTypeAlertsListComponent } from './alert-type-alerts-list.component';

describe('AlertTypeAlertsListComponent', () => {
  let component: AlertTypeAlertsListComponent;
  let fixture: ComponentFixture<AlertTypeAlertsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertTypeAlertsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertTypeAlertsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

