import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Modalportfolio2Component } from './modalportfolio2.component';

describe('Modalportfolio2Component', () => {
  let component: Modalportfolio2Component;
  let fixture: ComponentFixture<Modalportfolio2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modalportfolio2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Modalportfolio2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
