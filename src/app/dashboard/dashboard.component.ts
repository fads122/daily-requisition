import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../core/services/theme.service';

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

  constructor(public themeService: ThemeService) {}

  toggleSidebar() {
    this.collapsed.update((c) => !c);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
