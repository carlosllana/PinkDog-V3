import { Component } from '@angular/core';
import { ContentComponent } from "./homecontent/content.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [ContentComponent]
})
export default class HomeComponent {

}
