import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { OnInit } from '@angular/core';
import { SpinnerComponent } from './spinner/spinner.component';


declare var $: any;


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HeaderComponent, FooterComponent, SpinnerComponent]
})
export class AppComponent implements OnInit {
isLoading = true;
ngOnInit(): void {
  setTimeout(() => {
    this.isLoading = false;
  }, 3000);
}

}
