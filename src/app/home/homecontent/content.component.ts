import { Component } from '@angular/core';
import { GcommentsComponent } from "../gcomments/gcomments.component";
import { HomeBrandConsultationComponent } from "../home-brand-consultation/home-brand-consultation.component";
import { HomeAboutComponent } from "../home-about/home-about.component";
import { RouterLink} from '@angular/router';
import { ModalComponent } from '../modal/modal.component';



@Component({
    selector: 'app-home-content',
    standalone: true,
    templateUrl: './content.component.html',
    styleUrl: './content.component.css',
    imports: [GcommentsComponent, HomeBrandConsultationComponent, HomeAboutComponent, RouterLink,ModalComponent,]
})
export class ContentComponent {




}
