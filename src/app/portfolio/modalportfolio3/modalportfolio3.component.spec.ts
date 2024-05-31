import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Modalportfolio3Component } from './modalportfolio3.component';

describe('Modalportfolio3Component', () => {
  let component: Modalportfolio3Component;
  let fixture: ComponentFixture<Modalportfolio3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modalportfolio3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Modalportfolio3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
