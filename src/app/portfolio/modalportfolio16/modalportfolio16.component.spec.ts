import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Modalportfolio16Component } from './modalportfolio16.component';

describe('Modalportfolio16Component', () => {
  let component: Modalportfolio16Component;
  let fixture: ComponentFixture<Modalportfolio16Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modalportfolio16Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Modalportfolio16Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
