import { Component } from '@angular/core';
import { HomeBrandConsultationComponent } from "../../home/home-brand-consultation/home-brand-consultation.component";
import { PortfoliocarouselComponent } from "../portfoliocarousel/portfoliocarousel.component";
import { CarouselcasestudiesComponent } from "../carouselcasestudies/carouselcasestudies.component";

@Component({
    selector: 'app-portfolio-case-study3',
    standalone: true,
    templateUrl: './portfolio-case-study3.component.html',
    styleUrl: './portfolio-case-study3.component.css',
    imports: [HomeBrandConsultationComponent, PortfoliocarouselComponent, CarouselcasestudiesComponent]
})
export default class PortfolioCaseStudy3Component {
  activeSlideIndex = 3;
}
