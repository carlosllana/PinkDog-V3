import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeBrandConsultationComponent } from "../home/home-brand-consultation/home-brand-consultation.component";





@Component({
    selector: 'app-team',
    standalone: true,
    templateUrl: './team.component.html',
    styleUrl: './team.component.css',
    imports: [HomeBrandConsultationComponent, CommonModule]
})
export default class TeamComponent {
  mostrarElemento1: boolean;
  mostrarElemento2: boolean;
  mostrarElemento3: boolean;
  mostrarElementoAdicional: boolean;

  constructor() {
    this.mostrarElemento1 = false;
    this.mostrarElemento2 = false;
    this.mostrarElemento3 = false;
    this.mostrarElementoAdicional = true;
  }

  mostrarElemento(numero: number) {
    if (numero === 1) {
      this.mostrarElemento1 = true;
      this.mostrarElemento2 = false;
      this.mostrarElemento3 = false;
    } else if (numero === 2) {
      this.mostrarElemento1 = false;
      this.mostrarElemento2 = true;
      this.mostrarElemento3 = false;
    } else if (numero === 3) {
      this.mostrarElemento1 = false;
      this.mostrarElemento2 = false;
      this.mostrarElemento3 = true;
    }
    this.mostrarElementoAdicional = false; // Oculta el elemento adicional
  }

  cerrarElementos() {
    this.mostrarElemento1 = false;
    this.mostrarElemento2 = false;
    this.mostrarElemento3 = false;
    this.mostrarElementoAdicional = true; // Vuelve a mostrar el elemento adicional al cerrar
  }
}
