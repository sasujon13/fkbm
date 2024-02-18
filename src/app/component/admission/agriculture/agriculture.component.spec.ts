import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgricultureComponent } from './agriculture.component';

describe('AgricultureComponent', () => {
  let component: AgricultureComponent;
  let fixture: ComponentFixture<AgricultureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgricultureComponent]
    });
    fixture = TestBed.createComponent(AgricultureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
