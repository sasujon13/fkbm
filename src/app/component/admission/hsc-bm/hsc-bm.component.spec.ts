import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HscBMComponent } from './hsc-bm.component';

describe('HscBMComponent', () => {
  let component: HscBMComponent;
  let fixture: ComponentFixture<HscBMComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HscBMComponent]
    });
    fixture = TestBed.createComponent(HscBMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
