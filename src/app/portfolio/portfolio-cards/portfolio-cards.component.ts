import { Component } from '@angular/core';
import { RouterLink} from '@angular/router';
import { ModalportfolioComponent } from '../modalportfolio/modalportfolio.component';
import { Modalportfolio2Component } from "../modalportfolio2/modalportfolio2.component";
import { Modalportfolio3Component } from "../modalportfolio3/modalportfolio3.component";
import { Modalportfolio4Component } from "../modalportfolio4/modalportfolio4.component";
import { Modalportfolio5Component } from "../modalportfolio5/modalportfolio5.component";
import { Modalportfolio6Component } from "../modalportfolio6/modalportfolio6.component";
import { Modalportfolio7Component } from "../modalportfolio7/modalportfolio7.component";
import { Modalportfolio8Component } from "../modalportfolio8/modalportfolio8.component";
import { Modalportfolio9Component } from "../modalportfolio9/modalportfolio9.component";
import { Modalportfolio10Component } from "../modalportfolio10/modalportfolio10.component";
import { Modalportfolio11Component } from "../modalportfolio11/modalportfolio11.component";
import { Modalportfolio12Component } from "../modalportfolio12/modalportfolio12.component";
import { Modalportfolio13Component } from "../modalportfolio13/modalportfolio13.component";
import { Modalportfolio14Component } from "../modalportfolio14/modalportfolio14.component";
import { Modalportfolio15Component } from "../modalportfolio15/modalportfolio15.component";
import { Modalportfolio16Component } from "../modalportfolio16/modalportfolio16.component";
import { Modalportfolio17Component } from "../modalportfolio17/modalportfolio17.component";

@Component({
    selector: 'app-portfolio-cards',
    standalone: true,
    templateUrl: './portfolio-cards.component.html',
    styleUrl: './portfolio-cards.component.css',
    imports: [RouterLink,
        ModalportfolioComponent,
        Modalportfolio2Component,
        Modalportfolio3Component,
        Modalportfolio4Component,
        Modalportfolio5Component, Modalportfolio6Component, Modalportfolio7Component, Modalportfolio8Component, Modalportfolio9Component, Modalportfolio10Component, Modalportfolio11Component, Modalportfolio12Component, Modalportfolio13Component, Modalportfolio14Component, Modalportfolio15Component, Modalportfolio16Component,Modalportfolio17Component]
})
export class PortfolioCardsComponent {

}
