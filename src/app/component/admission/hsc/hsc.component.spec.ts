import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HscComponent } from './hsc.component';

describe('HscComponent', () => {
  let component: HscComponent;
  let fixture: ComponentFixture<HscComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HscComponent]
    });
    fixture = TestBed.createComponent(HscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
