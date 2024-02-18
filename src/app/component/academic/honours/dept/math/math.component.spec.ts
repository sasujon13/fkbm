import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MathComponent } from './math.component';

describe('MathComponent', () => {
  let component: MathComponent;
  let fixture: ComponentFixture<MathComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MathComponent]
    });
    fixture = TestBed.createComponent(MathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
