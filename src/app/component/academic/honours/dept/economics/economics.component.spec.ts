import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EconomicsComponent } from './economics.component';

describe('EconomicsComponent', () => {
  let component: EconomicsComponent;
  let fixture: ComponentFixture<EconomicsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EconomicsComponent]
    });
    fixture = TestBed.createComponent(EconomicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
