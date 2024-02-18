import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtsComponent } from './arts.component';

describe('ArtsComponent', () => {
  let component: ArtsComponent;
  let fixture: ComponentFixture<ArtsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtsComponent]
    });
    fixture = TestBed.createComponent(ArtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
