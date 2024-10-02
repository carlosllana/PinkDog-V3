import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Modalportfolio10Component } from './modalportfolio10.component';

describe('Modalportfolio10Component', () => {
  let component: Modalportfolio10Component;
  let fixture: ComponentFixture<Modalportfolio10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modalportfolio10Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Modalportfolio10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
