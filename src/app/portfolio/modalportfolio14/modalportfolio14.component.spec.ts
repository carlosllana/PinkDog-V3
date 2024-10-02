import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Modalportfolio14Component } from './modalportfolio14.component';

describe('Modalportfolio14Component', () => {
  let component: Modalportfolio14Component;
  let fixture: ComponentFixture<Modalportfolio14Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modalportfolio14Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Modalportfolio14Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
