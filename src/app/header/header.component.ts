import { Component, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ModalComponent } from '../home/modal/modal.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, ModalComponent, NgbCollapseModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @ViewChild('navbarCollapse', { static: false }) navbarCollapse: ElementRef;
  isCollapsed = true;

  constructor(private modalService: NgbModal, private renderer: Renderer2) {}

  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;
  }

  closeMenu() {
    this.isCollapsed = true;
  }

  openModal() {
    this.closeMenu();
    this.modalService.open(ModalComponent);
  }
}
