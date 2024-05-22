import { Component } from '@angular/core';
import { ServicescarouselComponent } from "./servicescarousel/servicescarousel.component";
import { HomeBrandConsultationComponent } from "../home/home-brand-consultation/home-brand-consultation.component";
import { ExtraOptions } from '@angular/router';

@Component({
    selector: 'app-services',
    standalone: true,
    templateUrl: './services.component.html',
    styleUrl: './services.component.css',
    imports: [ServicescarouselComponent, HomeBrandConsultationComponent]
})
export default class ServicesComponent {

  scrollTo(element: any): void {
    (document.getElementById(element) as HTMLElement).scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }



}

