import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePortfolio1Component } from './home-portfolio.component';

describe('HomePortfolio1Component', () => {
  let component: HomePortfolio1Component;
  let fixture: ComponentFixture<HomePortfolio1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePortfolio1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomePortfolio1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
