import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertTypesListScrollComponent } from './alert-types-list-scroll.component';

describe('AlertTypesListScrollComponent', () => {
  let component: AlertTypesListScrollComponent;
  let fixture: ComponentFixture<AlertTypesListScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertTypesListScrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertTypesListScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

