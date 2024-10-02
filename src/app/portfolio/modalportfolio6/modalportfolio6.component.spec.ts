import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Modalportfolio6Component } from './modalportfolio6.component';

describe('Modalportfolio6Component', () => {
  let component: Modalportfolio6Component;
  let fixture: ComponentFixture<Modalportfolio6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modalportfolio6Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Modalportfolio6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
