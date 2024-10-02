import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Modalportfolio11Component } from './modalportfolio11.component';

describe('Modalportfolio11Component', () => {
  let component: Modalportfolio11Component;
  let fixture: ComponentFixture<Modalportfolio11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modalportfolio11Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Modalportfolio11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
