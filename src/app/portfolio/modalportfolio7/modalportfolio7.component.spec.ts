import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Modalportfolio7Component } from './modalportfolio7.component';

describe('Modalportfolio7Component', () => {
  let component: Modalportfolio7Component;
  let fixture: ComponentFixture<Modalportfolio7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modalportfolio7Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Modalportfolio7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
