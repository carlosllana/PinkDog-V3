import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Modalportfolio15Component } from './modalportfolio15.component';

describe('Modalportfolio15Component', () => {
  let component: Modalportfolio15Component;
  let fixture: ComponentFixture<Modalportfolio15Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modalportfolio15Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Modalportfolio15Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
