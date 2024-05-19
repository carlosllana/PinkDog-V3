import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioCaseStudy2Component } from './portfolio-case-study2.component';

describe('PortfolioCaseStudy2Component', () => {
  let component: PortfolioCaseStudy2Component;
  let fixture: ComponentFixture<PortfolioCaseStudy2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioCaseStudy2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PortfolioCaseStudy2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
