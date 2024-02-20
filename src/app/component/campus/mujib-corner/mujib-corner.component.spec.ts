import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MujibCornerComponent } from './mujib-corner.component';

describe('MujibCornerComponent', () => {
  let component: MujibCornerComponent;
  let fixture: ComponentFixture<MujibCornerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MujibCornerComponent]
    });
    fixture = TestBed.createComponent(MujibCornerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
