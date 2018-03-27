import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrimeWorkComponent } from './crime-work.component';

describe('CrimeWorkComponent', () => {
  let component: CrimeWorkComponent;
  let fixture: ComponentFixture<CrimeWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrimeWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrimeWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
