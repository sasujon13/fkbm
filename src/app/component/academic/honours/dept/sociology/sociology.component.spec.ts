import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SociologyComponent } from './sociology.component';

describe('SociologyComponent', () => {
  let component: SociologyComponent;
  let fixture: ComponentFixture<SociologyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SociologyComponent]
    });
    fixture = TestBed.createComponent(SociologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
