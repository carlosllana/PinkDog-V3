import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-about',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home-about.component.html',
  styleUrls: ['./home-about.component.css']
})
export class HomeAboutComponent implements OnInit{

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {}


}
