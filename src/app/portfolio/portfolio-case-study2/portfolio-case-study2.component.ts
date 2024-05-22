import { Component } from '@angular/core';
import { HomeBrandConsultationComponent } from "../../home/home-brand-consultation/home-brand-consultation.component";
import { PortfoliocarouselComponent } from "../portfoliocarousel/portfoliocarousel.component";
import { CarouselcasestudiesComponent } from "../carouselcasestudies/carouselcasestudies.component";

@Component({
  selector: 'app-portfolio-case-study2',
  standalone: true,
  templateUrl: './portfolio-case-study2.component.html',
  styleUrls: ['./portfolio-case-study2.component.css'],
  imports: [HomeBrandConsultationComponent, PortfoliocarouselComponent, CarouselcasestudiesComponent]
})
export default class PortfolioCaseStudy2Component {
  activeSlideIndex = 3;
}
