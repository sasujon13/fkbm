import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HonoursComponent } from './honours.component';

describe('HonoursComponent', () => {
  let component: HonoursComponent;
  let fixture: ComponentFixture<HonoursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HonoursComponent]
    });
    fixture = TestBed.createComponent(HonoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
