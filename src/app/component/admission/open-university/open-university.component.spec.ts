import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenUniversityComponent } from './open-university.component';

describe('OpenUniversityComponent', () => {
  let component: OpenUniversityComponent;
  let fixture: ComponentFixture<OpenUniversityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpenUniversityComponent]
    });
    fixture = TestBed.createComponent(OpenUniversityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
