import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Modalportfolio8Component } from './modalportfolio8.component';

describe('Modalportfolio8Component', () => {
  let component: Modalportfolio8Component;
  let fixture: ComponentFixture<Modalportfolio8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modalportfolio8Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Modalportfolio8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
