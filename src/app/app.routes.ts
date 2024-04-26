import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import path from 'path';

export const routes: Routes = [
  
  {
  
  path: 'home', 
  loadComponent: () => import('./home/home.component'),
  

}, 
{
  
  path: 'portfolio', 
  loadComponent: () => import('./portfolio/portfolio.component'),

},

{
  
  path: 'casestudies', 
  loadComponent: () => import('./portfolio/portfolio-case-study/portfolio-case-study.component'),

},


{
  
  path: 'team', 
  loadComponent: () => import('./team/team.component'),

},
{
  
  path: 'services', 
  loadComponent: () => import('./services/services.component'),

},


{
path:'',
 loadComponent: () => import('./home/home.component'),}
 
];
