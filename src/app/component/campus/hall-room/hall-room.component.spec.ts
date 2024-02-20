import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HallRoomComponent } from './hall-room.component';

describe('HallRoomComponent', () => {
  let component: HallRoomComponent;
  let fixture: ComponentFixture<HallRoomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HallRoomComponent]
    });
    fixture = TestBed.createComponent(HallRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
