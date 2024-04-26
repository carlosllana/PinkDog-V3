import { Component } from '@angular/core';
import { PortfoliocarouselComponent } from "../portfoliocarousel/portfoliocarousel.component";
import { HomeBrandConsultationComponent } from '../../home/home-brand-consultation/home-brand-consultation.component';

@Component({
    selector: 'app-portfolio-case-study',
    standalone: true,
    templateUrl: './portfolio-case-study.component.html',
    styleUrl: './portfolio-case-study.component.css',
    imports: [PortfoliocarouselComponent, HomeBrandConsultationComponent]
})
export default class PortfolioCaseStudyComponent {

}
