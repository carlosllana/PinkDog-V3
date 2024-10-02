import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { PortfoliocarouselComponent } from "./portfoliocarousel/portfoliocarousel.component";
import { HomeBrandConsultationComponent } from "../home/home-brand-consultation/home-brand-consultation.component";
import { PortfolioCardsComponent } from "./portfolio-cards/portfolio-cards.component";
import { ModalportfolioComponent } from './modalportfolio/modalportfolio.component';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
  imports: [PortfoliocarouselComponent, PortfolioCardsComponent, HomeBrandConsultationComponent, ModalportfolioComponent]
})
export default class PortfolioComponent implements OnInit {

  constructor(private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
    console.log('PortfolioComponent initialized');
    this.viewportScroller.scrollToPosition([0, 0]);
    console.log('Scrolled to top in PortfolioComponent');
  }
}
