import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GcommentsComponent } from "../gcomments/gcomments.component";
import { HomeBrandConsultationComponent } from "../home-brand-consultation/home-brand-consultation.component";
import { HomeAboutComponent } from "../home-about/home-about.component";
import { RouterLink } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';
import { HomePortfolio1Component } from "../home-portfolio/home-portfolio.component";
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-home-content',
  standalone: true,
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  imports: [
    CommonModule,
    GcommentsComponent,
    HomeBrandConsultationComponent,
    HomeAboutComponent,
    RouterLink,
    ModalComponent,
    HomePortfolio1Component,
    NgxPageScrollCoreModule
  ]
})
export class ContentComponent implements AfterViewInit {
  @ViewChild('video') videoElement!: ElementRef<HTMLVideoElement>;

  allLogos: string[] = [
    "../../../assets/img/logo_BLT.png",
    "../../../assets/img/logo_Anatel.png",
    "../../../assets/img/logo_STM.png",
    "../../../assets/img/logo_ACS.png",
    "../../../assets/img/logo_GO.png",
    "../../../assets/img/logo_Caleu.png",
    "../../../assets/img/logo_BWS.png",
    "../../../assets/img/logo_kubio.png",
    "../../../assets/img/logo_fluorescencia.svg",
    "../../../assets/img/logo_naan.svg"
  ];

  currentLogos: string[] = [];
  availableLogos: string[] = [];
  private visibleLogos: boolean[] = [];
  private intervalId?: number;
  private logosToShow: number = 8;

  constructor(private viewportScroller: ViewportScroller) {}

  ngAfterViewInit(): void {
    // Determine the number of logos to show based on screen width
    this.logosToShow = window.innerWidth < 768 ? 4 : 8;

    // Initialize the logos
    this.currentLogos = this.shuffleArray(this.allLogos).slice(0, this.logosToShow);
    this.availableLogos = this.allLogos.filter(logo => !this.currentLogos.includes(logo));
    this.visibleLogos = new Array(this.logosToShow).fill(true);

    setTimeout(() => {
      const video = this.videoElement.nativeElement;
      if (video && typeof video.play === 'function') {
        video.muted = true;
        video.autoplay = true;
        video.loop = true;
        video.playsInline = true;

        video.play().then(() => {
          video.addEventListener('playing', () => {
          });
        }).catch(error => {
          console.error('Error al intentar reproducir el video:', error);
        });
      }
    }, 100);

    this.intervalId = window.setTimeout(() => {
      this.updateLogos();
    }, 5000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  updateLogos() {
    this.updateSingleLogo();

    this.intervalId = window.setTimeout(() => {
      this.updateLogos();
    }, 5000);
  }

  updateSingleLogo() {
    const availableLogos = this.availableLogos;
    const randomIndex = Math.floor(Math.random() * availableLogos.length);
    const randomLogo = availableLogos.splice(randomIndex, 1)[0]; // Elimina el logo seleccionado de la lista disponible
    const logoIndex = Math.floor(Math.random() * this.currentLogos.length); // Elige un índice aleatorio para reemplazar

    // Realiza el desvanecimiento de la imagen
    this.fadeOutLogo(logoIndex);

    setTimeout(() => {
      // Actualiza los logos visibles y los disponibles
      this.availableLogos.push(this.currentLogos[logoIndex]); // El logo actual va a la lista de disponibles
      this.currentLogos[logoIndex] = randomLogo; // El nuevo logo reemplaza al anterior

      // Muestra la nueva imagen con fade in
      this.fadeInLogo(logoIndex);

    }, 1000); // Tiempo para que la animación de fade out termine
  }

  fadeOutLogo(index: number) {
    this.visibleLogos[index] = false;
  }

  fadeInLogo(index: number) {
    setTimeout(() => {
      this.visibleLogos[index] = true;
    }, 500); // Aplaza el fade-in para asegurarse de que el fade-out ha terminado
  }

  isVisible(index: number): boolean {
    return this.visibleLogos[index];
  }

  private shuffleArray(array: string[]): string[] {
    return array.sort(() => Math.random() - 0.5);
  }
}
