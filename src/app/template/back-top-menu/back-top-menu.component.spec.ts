import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackTopMenuComponent } from './back-top-menu.component';

describe('BackTopMenuComponent', () => {
  let component: BackTopMenuComponent;
  let fixture: ComponentFixture<BackTopMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackTopMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackTopMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
