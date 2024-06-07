import { Component, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-portfoliocarousel',
  standalone: true,
  imports: [NgFor],
  templateUrl: './portfoliocarousel.component.html',
  styleUrls: ['./portfoliocarousel.component.css']
})
export class PortfoliocarouselComponent implements AfterViewInit, OnDestroy {
  @Input() activeSlideIndex: number = 0;

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

  private carousel: any;
  private carouselElement: HTMLElement | null = null;

  constructor(private router: Router) {}

  ngAfterViewInit() {
    // Inicializar el carrusel
    this.carouselElement = document.querySelector('#carouselExampleFade');
    if (this.carouselElement) {
      this.carousel = new bootstrap.Carousel(this.carouselElement, {
        interval: 2000,
        wrap: true
      });

      // Mover a la imagen especificada por activeSlideIndex
      this.carousel.to(this.activeSlideIndex);

      // Escuchar el evento de slide cuando cambia
      this.carouselElement.addEventListener('slid.bs.carousel', this.onSlideChange.bind(this));
    }
  }

  ngOnDestroy() {
    if (this.carouselElement) {
      this.carouselElement.removeEventListener('slid.bs.carousel', this.onSlideChange.bind(this));
    }
  }

  nextSlide() {
    if (this.carousel) {
      this.carousel.next();
    }
  }

  prevSlide() {
    if (this.carousel) {
      this.carousel.prev();
    }
  }

  private onSlideChange() {
    this.updateActiveSlideIndex();
    this.navigateToCurrentRoute();
  }

  private updateActiveSlideIndex() {
    // Actualizar el índice del slide activo
    const activeItem = document.querySelector('.carousel-item.active');
    if (activeItem && activeItem.parentElement) {
      this.activeSlideIndex = Array.from(activeItem.parentElement.children).indexOf(activeItem);
    }
  }

  private navigateToCurrentRoute() {
    // Navegar a la ruta del slide activo
    const currentItem = this.items[this.activeSlideIndex];
    if (currentItem) {
      this.router.navigate([currentItem.route]);
    }
  }
}
