import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanglaComponent } from './bangla.component';

describe('BanglaComponent', () => {
  let component: BanglaComponent;
  let fixture: ComponentFixture<BanglaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BanglaComponent]
    });
    fixture = TestBed.createComponent(BanglaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
