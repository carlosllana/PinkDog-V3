import { Component } from '@angular/core';
import { ServicescarouselComponent } from "./servicescarousel/servicescarousel.component";
import { HomeBrandConsultationComponent } from "../home/home-brand-consultation/home-brand-consultation.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services',
  standalone: true,
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  imports: [ServicescarouselComponent, HomeBrandConsultationComponent, RouterLink]
})
export default class ServicesComponent {

  scrollTo(element: string): void {
    const targetElement = document.getElementById(element);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });

      // Ajustar la posición después de un pequeño retraso para asegurar que scrollIntoView haya terminado
      setTimeout(() => {
        window.scrollBy({
          top: -100, // Desplaza 100 píxeles hacia arriba
          behavior: 'smooth'
        });
      }, 1000); // Ajusta el tiempo de espera según sea necesario
    }
  }
}
