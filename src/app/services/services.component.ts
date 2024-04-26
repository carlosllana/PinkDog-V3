import { Component } from '@angular/core';
import { ServicescarouselComponent } from "./servicescarousel/servicescarousel.component";
import { HomeBrandConsultationComponent } from "../home/home-brand-consultation/home-brand-consultation.component";

@Component({
    selector: 'app-services',
    standalone: true,
    templateUrl: './services.component.html',
    styleUrl: './services.component.css',
    imports: [ServicescarouselComponent, HomeBrandConsultationComponent]
})
export default class ServicesComponent {

}
