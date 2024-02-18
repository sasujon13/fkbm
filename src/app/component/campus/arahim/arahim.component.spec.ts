import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArahimComponent } from './arahim.component';

describe('ArahimComponent', () => {
  let component: ArahimComponent;
  let fixture: ComponentFixture<ArahimComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArahimComponent]
    });
    fixture = TestBed.createComponent(ArahimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
