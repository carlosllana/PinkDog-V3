import { Component } from '@angular/core';
import { RouterLink} from '@angular/router';
import { ModalportfolioComponent } from '../modalportfolio/modalportfolio.component';

@Component({
  selector: 'app-portfolio-cards',
  standalone: true,
  imports: [RouterLink, ModalportfolioComponent],
  templateUrl: './portfolio-cards.component.html',
  styleUrl: './portfolio-cards.component.css'
})
export class PortfolioCardsComponent {

}
