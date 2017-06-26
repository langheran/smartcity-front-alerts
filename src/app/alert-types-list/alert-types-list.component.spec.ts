import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertTypesListComponent } from './alert-types-list.component';

describe('AlertTypesListComponent', () => {
  let component: AlertTypesListComponent;
  let fixture: ComponentFixture<AlertTypesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertTypesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertTypesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
