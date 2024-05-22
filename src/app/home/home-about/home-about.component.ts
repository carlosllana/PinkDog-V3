import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-about',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home-about.component.html',
  styleUrls: ['./home-about.component.css']
})
export class HomeAboutComponent implements OnInit, AfterContentInit {

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {}

  ngAfterContentInit() {
    console.log('ngAfterContentInit called'); // Log para verificar que ngAfterContentInit se llama

    this.activatedRoute.fragment.subscribe((fragment) => {
      console.log(`Fragment received: ${fragment}`); // Log para verificar que el fragmento se recibe
      if (fragment) {
        this.jumpTo(fragment);
      } else {
        console.log('Fragment is null');
      }
    });

    // Añadimos una verificación periódica para asegurar que capturamos el fragmento
    setTimeout(() => {
      const fragment = this.activatedRoute.snapshot.fragment;
      console.log(`Snapshot fragment received: ${fragment}`); // Log para verificar que el fragmento se recibe
      if (fragment) {
        this.jumpTo(fragment);
      } else {
        console.log('Snapshot fragment is null');
      }
    }, 500); // Puedes ajustar el retraso según sea necesario
  }

  jumpTo(element: string | null): void {
    if (element) {
      const target = document.getElementById(element);
      console.log(`Trying to scroll to element with id: ${element}`); // Log para depuración
      if (target) {
        console.log(`Element found: ${target}`); // Log cuando el elemento es encontrado
        target.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.log(`Element with id ${element} not found`); // Log cuando el elemento no se encuentra
      }
    }
  }
}
