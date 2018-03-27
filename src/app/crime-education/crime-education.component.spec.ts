import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrimeEducationComponent } from './crime-education.component';

describe('CrimeEducationComponent', () => {
  let component: CrimeEducationComponent;
  let fixture: ComponentFixture<CrimeEducationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrimeEducationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrimeEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
