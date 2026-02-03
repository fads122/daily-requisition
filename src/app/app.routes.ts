import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./landing/landing.component').then(m => m.LandingComponent) },
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    children: [
      { path: '', loadComponent: () => import('./dashboard/pages/page1/page1.component').then(m => m.Page1Component), pathMatch: 'full' },
      { path: 'daily-production', loadComponent: () => import('./dashboard/pages/page2/page2.component').then(m => m.Page2Component) },
      { path: 'material-requisition', loadComponent: () => import('./dashboard/pages/page3/page3.component').then(m => m.Page3Component) },
      { path: 'usage-report', loadComponent: () => import('./dashboard/pages/page4/page4.component').then(m => m.Page4Component) },
    ],
  },
  { path: 'home', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];
