import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { HomeBrandConsultationComponent } from "../../home/home-brand-consultation/home-brand-consultation.component";
import { PortfoliocarouselComponent } from "../portfoliocarousel/portfoliocarousel.component";
import { CarouselcasestudiesComponent } from "../carouselcasestudies/carouselcasestudies.component";
import { Carouselcasestudies3Component } from "../carouselcasestudies3/carouselcasestudies3.component";

@Component({
    selector: 'app-portfolio-case-study3',
    standalone: true,
    templateUrl: './portfolio-case-study3.component.html',
    styleUrls: ['./portfolio-case-study3.component.css'],
    imports: [HomeBrandConsultationComponent, PortfoliocarouselComponent, CarouselcasestudiesComponent, Carouselcasestudies3Component]
})
export default class PortfolioCaseStudy3Component implements OnInit {
  activeSlideIndex = 3;

  constructor(private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
