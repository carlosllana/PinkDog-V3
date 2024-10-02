import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Modalportfolio9Component } from './modalportfolio9.component';

describe('Modalportfolio9Component', () => {
  let component: Modalportfolio9Component;
  let fixture: ComponentFixture<Modalportfolio9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modalportfolio9Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Modalportfolio9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
