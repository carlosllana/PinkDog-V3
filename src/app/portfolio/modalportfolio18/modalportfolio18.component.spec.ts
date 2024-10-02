import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Modalportfolio18Component } from './modalportfolio18.component';

describe('Modalportfolio18Component', () => {
  let component: Modalportfolio18Component;
  let fixture: ComponentFixture<Modalportfolio18Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modalportfolio18Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Modalportfolio18Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
