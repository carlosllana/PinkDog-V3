import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions, Router, NavigationEnd } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs/operators';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then(m => m.default),
  },
  {
    path: 'portfolio',
    loadComponent: () => import('./portfolio/portfolio.component').then(m => m.default),
  },
  {
    path: 'casestudies',
    loadComponent: () => import('./portfolio/portfolio-case-study/portfolio-case-study.component').then(m => m.default),
  },
  {
    path: 'casestudies2',
    loadComponent: () => import('./portfolio/portfolio-case-study2/portfolio-case-study2.component').then(m => m.default),
  },
  {
    path: 'casestudies3',
    loadComponent: () => import('./portfolio/portfolio-case-study3/portfolio-case-study3.component').then(m => m.default),
  },
  {
    path: 'team',
    loadComponent: () => import('./team/team.component').then(m => m.default),
  },
  {
    path: 'services',
    loadComponent: () => import('./services/services.component').then(m => m.default),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.default),
  },
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.default),
  }
];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled', // Restablece la posición de desplazamiento
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router, private viewportScroller: ViewportScroller) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.viewportScroller.scrollToPosition([0, 0]);
    });
  }
}
