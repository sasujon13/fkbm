import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HscBmComponent } from './hsc-bm.component';

describe('HscBmComponent', () => {
  let component: HscBmComponent;
  let fixture: ComponentFixture<HscBmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HscBmComponent]
    });
    fixture = TestBed.createComponent(HscBmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
