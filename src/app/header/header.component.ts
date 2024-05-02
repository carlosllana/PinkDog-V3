import { Component } from '@angular/core';
import { RouterLink} from '@angular/router';
import { ModalComponent } from '../home/modal/modal.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ RouterLink, ModalComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
