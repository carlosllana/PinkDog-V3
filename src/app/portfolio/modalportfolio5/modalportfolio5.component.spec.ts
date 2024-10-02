import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Modalportfolio5Component } from './modalportfolio5.component';

describe('Modalportfolio5Component', () => {
  let component: Modalportfolio5Component;
  let fixture: ComponentFixture<Modalportfolio5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modalportfolio5Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Modalportfolio5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
