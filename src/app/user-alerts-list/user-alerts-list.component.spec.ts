import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAlertsListComponent } from './user-alerts-list.component';

describe('UserAlertsListComponent', () => {
  let component: UserAlertsListComponent;
  let fixture: ComponentFixture<UserAlertsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAlertsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAlertsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

