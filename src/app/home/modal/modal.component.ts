import { Component } from '@angular/core';
import { HomeBrandConsultationComponent } from "../home-brand-consultation/home-brand-consultation.component";

@Component({
    selector: 'app-modal',
    standalone: true,
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.css',
    imports: [HomeBrandConsultationComponent]
})
export class ModalComponent { ModalComponent: any

}
