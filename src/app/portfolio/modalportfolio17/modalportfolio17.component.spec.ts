import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Modalportfolio17Component } from './modalportfolio17.component';

describe('Modalportfolio17Component', () => {
  let component: Modalportfolio17Component;
  let fixture: ComponentFixture<Modalportfolio17Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modalportfolio17Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Modalportfolio17Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
