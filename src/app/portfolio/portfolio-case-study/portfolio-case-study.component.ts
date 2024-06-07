import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { PortfoliocarouselComponent } from '../portfoliocarousel/portfoliocarousel.component';
import { HomeBrandConsultationComponent } from '../../home/home-brand-consultation/home-brand-consultation.component';
import { CarouselcasestudiesComponent } from '../carouselcasestudies/carouselcasestudies.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-portfolio-case-study',
    standalone: true,
    templateUrl: './portfolio-case-study.component.html',
    styleUrls: ['./portfolio-case-study.component.css'],
    imports: [PortfoliocarouselComponent, HomeBrandConsultationComponent, CarouselcasestudiesComponent, RouterLink]
})
export default class PortfolioCaseStudyComponent implements OnInit {
    activeSlideIndex = 2;

    constructor(private viewportScroller: ViewportScroller) { }

    ngOnInit(): void {
        this.viewportScroller.scrollToPosition([0, 0]);
    }
}
