import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { routes, routerOptions } from '../../app.routes';

@Component({
  selector: 'app-home-about',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home-about.component.html',
  styleUrl: './home-about.component.css'
})
export class HomeAboutComponent {

}
