import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IctComponent } from './ict.component';

describe('IctComponent', () => {
  let component: IctComponent;
  let fixture: ComponentFixture<IctComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IctComponent]
    });
    fixture = TestBed.createComponent(IctComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
