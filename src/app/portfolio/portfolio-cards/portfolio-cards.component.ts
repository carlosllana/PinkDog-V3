import { Component } from '@angular/core';
import { RouterLink} from '@angular/router';
import { ModalportfolioComponent } from '../modalportfolio/modalportfolio.component';
import { Modalportfolio2Component } from "../modalportfolio2/modalportfolio2.component";
import { Modalportfolio3Component } from "../modalportfolio3/modalportfolio3.component";
import { Modalportfolio4Component } from "../modalportfolio4/modalportfolio4.component";

@Component({
    selector: 'app-portfolio-cards',
    standalone: true,
    templateUrl: './portfolio-cards.component.html',
    styleUrl: './portfolio-cards.component.css',
    imports: [RouterLink,
       ModalportfolioComponent,
       Modalportfolio2Component,
       Modalportfolio3Component,
       Modalportfolio4Component]
})
export class PortfolioCardsComponent {

}
