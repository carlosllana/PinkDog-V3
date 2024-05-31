import { Component, Input, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-portfoliocarousel',
  standalone: true,
  imports: [RouterLink, NgFor],
  templateUrl: './portfoliocarousel.component.html',
  styleUrls: ['./portfoliocarousel.component.css']
})
export class PortfoliocarouselComponent implements AfterViewInit {
  @Input() activeSlideIndex: number = 0; // Define el @Input

  items = [
    {
      src: '../../../assets/img/carousel_casestudies1.png',
      srcSmall: '../../../assets/img/carousel_casestudies1_small.png',
      alt: 'First slide',
      route: '/casestudies'
    },
    {
      src: '../../../assets/img/carousel_casestudies2.png',
      srcSmall: '../../../assets/img/carousel_casestudies2_small.png',
      alt: 'Second slide',
      route: '/casestudies2'
    },
    {
      src: '../../../assets/img/carousel_casestudies3.png',
      srcSmall: '../../../assets/img/carousel_casestudies3_small.png',
      alt: 'Third slide',
      route: '/casestudies3'
    }
  ];

  get nextRoute(): string {
    const nextIndex = (this.activeSlideIndex + 1) % this.items.length;
    return this.items[nextIndex].route;
  }

  get prevRoute(): string {
    const prevIndex = (this.activeSlideIndex - 1 + this.items.length) % this.items.length;
    return this.items[prevIndex].route;
  }

  ngAfterViewInit() {
    // Inicializar el carrusel
    const myCarousel = document.querySelector('#carouselExampleFade');
    const carousel = new bootstrap.Carousel(myCarousel, {
      interval: 2000,
      wrap: true
    });

    // Mover a la imagen especificada por activeSlideIndex
    carousel.to(this.activeSlideIndex);
  }
}
