import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogoService {
  private logosArriba: string[] = [
    '../../assets/img/logo_BLT.png',
    '../../assets/img/logo_Anatel.png',
    '../../assets/img/logo_STM.png',
    '../../assets/img/logo_ACS.png',
    '../../assets/img/logo_GO.png'
  ];

  private logosAbajo: string[] = [
    '../../../assets/img/logo_Caleu.png',
    '../../../assets/img/logo_BWS.png',
    '../../../assets/img/logo_Anatel.png',
    '../../../assets/img/logo_fluorescencia.svg',
    '../../../assets/img/logo_naan.svg'
  ];

  // Método para obtener las imágenes "arriba"
  getLogosArriba(): string[] {
    return this.logosArriba;
  }

  // Método para obtener las imágenes "abajo"
  getLogosAbajo(): string[] {
    return this.logosAbajo;
  }
}
