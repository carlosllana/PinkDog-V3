import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioCaseStudyComponent } from './portfolio-case-study.component';

describe('PortfolioCaseStudyComponent', () => {
  let component: PortfolioCaseStudyComponent;
  let fixture: ComponentFixture<PortfolioCaseStudyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioCaseStudyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PortfolioCaseStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
