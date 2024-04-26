import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfoliocarouselComponent } from './portfoliocarousel.component';

describe('PortfoliocarouselComponent', () => {
  let component: PortfoliocarouselComponent;
  let fixture: ComponentFixture<PortfoliocarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfoliocarouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PortfoliocarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
