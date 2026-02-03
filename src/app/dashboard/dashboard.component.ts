import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  collapsed = signal(false);

  navItems = [
    { label: 'Dashboard', route: '/dashboard', icon: 'dashboard' },
    { label: 'Daily Production', route: '/dashboard/daily-production', icon: 'factory' },
    { label: 'Material Requisition', route: '/dashboard/material-requisition', icon: 'document' },
    { label: 'Usage Report', route: '/dashboard/usage-report', icon: 'line-chart' },
  ] as const;

  toggleSidebar() {
    this.collapsed.update((c) => !c);
  }
}
