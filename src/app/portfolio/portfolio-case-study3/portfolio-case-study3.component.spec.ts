import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioCaseStudy3Component } from './portfolio-case-study3.component';

describe('PortfolioCaseStudy3Component', () => {
  let component: PortfolioCaseStudy3Component;
  let fixture: ComponentFixture<PortfolioCaseStudy3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioCaseStudy3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PortfolioCaseStudy3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
