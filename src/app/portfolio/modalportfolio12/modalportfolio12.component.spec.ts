import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Modalportfolio12Component } from './modalportfolio12.component';

describe('Modalportfolio12Component', () => {
  let component: Modalportfolio12Component;
  let fixture: ComponentFixture<Modalportfolio12Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modalportfolio12Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Modalportfolio12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
