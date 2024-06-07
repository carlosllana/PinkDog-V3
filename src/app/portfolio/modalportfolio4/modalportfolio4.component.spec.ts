import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Modalportfolio4Component } from './modalportfolio4.component';

describe('Modalportfolio4Component', () => {
  let component: Modalportfolio4Component;
  let fixture: ComponentFixture<Modalportfolio4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modalportfolio4Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Modalportfolio4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
