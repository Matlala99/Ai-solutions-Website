import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from './shared/header/header.component';
import { NgIf } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    HeaderComponent,
    RouterOutlet,
    NgIf,

  ]
})
export class AppComponent {
  title = 'AI-Solutions Website';
  showHeader = true; // Default to showing the header
  isLoading = false; // Controls loading spinner visibility

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.isLoading = true; // Show spinner when navigation starts
      }

      if (event instanceof NavigationEnd) {
        this.showHeader = !event.url.startsWith('/admin') && !event.url.startsWith('/login');

        // Simulate a delay for smooth UX

      }
    });
  }
}
