import { Component } from '@angular/core';
import { PortfoliocarouselComponent } from "./portfoliocarousel/portfoliocarousel.component";
import { HomeBrandConsultationComponent } from "../home/home-brand-consultation/home-brand-consultation.component";
import { PortfolioCardsComponent as PortfolioCardsComponent } from "./portfolio-cards/portfolio-cards.component";
import { ModalportfolioComponent } from './modalportfolio/modalportfolio.component';

@Component({
    selector: 'app-portfolio',
    standalone: true,
    templateUrl: './portfolio.component.html',
    styleUrl: './portfolio.component.css',
    imports: [PortfoliocarouselComponent, PortfolioCardsComponent, HomeBrandConsultationComponent, PortfolioCardsComponent, ModalportfolioComponent]
})
export default class PortfolioComponent {

}
