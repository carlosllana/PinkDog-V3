import { Component} from '@angular/core';
import { GcommentsComponent } from "../gcomments/gcomments.component";
import { HomeBrandConsultationComponent } from "../home-brand-consultation/home-brand-consultation.component";
import { HomeAboutComponent } from "../home-about/home-about.component";
import { RouterLink} from '@angular/router';
import { ModalComponent } from '../modal/modal.component';
import { HomePortfolio1Component } from "../home-portfolio/home-portfolio.component";
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';


@Component({
    selector: 'app-home-content',
    standalone: true,
    templateUrl: './content.component.html',
    styleUrl: './content.component.css',
    imports: [GcommentsComponent, HomeBrandConsultationComponent, HomeAboutComponent, RouterLink, ModalComponent, HomePortfolio1Component, NgxPageScrollCoreModule]
})
export class ContentComponent {



}




