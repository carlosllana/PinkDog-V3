import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-home-portfolio',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './home-portfolio.component.html',
  styleUrls: ['./home-portfolio.component.css']
})
export class HomePortfolio1Component {
  title = 'mouse-hover';
  showImage: boolean = true;
  currentImage: string = '../../../assets/img/homeportfolio2.png'; // Inicializa con la primera imagen

  constructor() {}

  onMouseEnter(imagePath: string) {
    this.currentImage = imagePath;
    this.showImage = true;
  }

  onMouseLeave() {
    // Este método puede quedar vacío si quieres que la imagen persista
    // o puedes comentar las siguientes líneas si prefieres que la imagen desaparezca al salir del mouse
    // this.currentImage = null;
    // this.showImage = false;
  }
}
