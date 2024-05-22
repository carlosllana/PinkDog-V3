import { Component } from '@angular/core';
import { PortfoliocarouselComponent } from '../portfoliocarousel/portfoliocarousel.component';
import { HomeBrandConsultationComponent } from '../../home/home-brand-consultation/home-brand-consultation.component';
import { CarouselcasestudiesComponent } from '../carouselcasestudies/carouselcasestudies.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-portfolio-case-study',
    standalone: true,
    templateUrl: './portfolio-case-study.component.html',
    styleUrl: './portfolio-case-study.component.css',
    imports: [PortfoliocarouselComponent, HomeBrandConsultationComponent, CarouselcasestudiesComponent, RouterLink]
})
export default class PortfolioCaseStudyComponent {
  activeSlideIndex = 2;

}
