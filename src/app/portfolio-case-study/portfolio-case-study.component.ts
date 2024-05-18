import { Component } from '@angular/core';
import { PortfoliocarouselComponent } from "../portfolio/portfoliocarousel/portfoliocarousel.component";
import { HomeBrandConsultationComponent } from '../home/home-brand-consultation/home-brand-consultation.component';
import { CarouselcasestudiesComponent } from '../portfolio/carouselcasestudies/carouselcasestudies.component';

@Component({
    selector: 'app-portfolio-case-study',
    standalone: true,
    templateUrl: './portfolio-case-study.component.html',
    styleUrl: './portfolio-case-study.component.css',
    imports: [PortfoliocarouselComponent, HomeBrandConsultationComponent, CarouselcasestudiesComponent]
})
export default class PortfolioCaseStudyComponent {

}
