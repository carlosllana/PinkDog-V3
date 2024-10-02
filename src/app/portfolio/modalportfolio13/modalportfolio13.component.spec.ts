import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Modalportfolio13Component } from './modalportfolio13.component';

describe('Modalportfolio13Component', () => {
  let component: Modalportfolio13Component;
  let fixture: ComponentFixture<Modalportfolio13Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modalportfolio13Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Modalportfolio13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
