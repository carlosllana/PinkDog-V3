import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Modalportfolio19Component } from './modalportfolio19.component';

describe('Modalportfolio19Component', () => {
  let component: Modalportfolio19Component;
  let fixture: ComponentFixture<Modalportfolio19Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modalportfolio19Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Modalportfolio19Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
