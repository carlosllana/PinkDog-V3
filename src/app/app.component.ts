import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { SpinnerComponent } from './spinner/spinner.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { ViewportScroller } from '@angular/common';



declare var $: any;

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet, HeaderComponent, FooterComponent, SpinnerComponent, NgbCollapseModule, ReactiveFormsModule ]
})
export class AppComponent implements OnInit {
  isLoading = true;

  constructor(private router: Router, private viewportScroller: ViewportScroller) {}

  ngOnInit(): void {

    // Scroll to top on route change
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe(() => {

      this.viewportScroller.scrollToPosition([0, 0]);

    });

    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }
}
