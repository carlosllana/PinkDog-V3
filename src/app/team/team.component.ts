import { Component } from '@angular/core';
import { HomeBrandConsultationComponent } from "../home/home-brand-consultation/home-brand-consultation.component";

@Component({
    selector: 'app-team',
    standalone: true,
    templateUrl: './team.component.html',
    styleUrl: './team.component.css',
    imports: [HomeBrandConsultationComponent]
})
export default class TeamComponent {

}
