// src/app/events/events.component.ts
import { Component, OnInit } from '@angular/core';
import { Event } from '../models/event'; // Ensure this path is correct
import { EventService } from '../services/event.service';
import {DatePipe, NgForOf, NgIf} from '@angular/common'; // Ensure this path is correct

@Component({
  selector: 'app-events',
  templateUrl: './event.component.html',
  imports: [
    DatePipe,
    NgForOf,
    NgIf
  ],
  // Corrected: Use a string, not an array
  styleUrls: ['./event.component.scss']
})
export class EventsComponent implements OnInit {
  events: Event[] = []; // Array to store events

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents(); // Load events when the component initializes
  }

  loadEvents() {
    this.eventService.getEvents().subscribe({
      next: (events) => {
        this.events = events; // Assign fetched events to the `events` array
      },
      error: (error) => {
        console.error('Error:', error);
        alert('Error loading events. Please try again.'); // Handle errors
      }
    });
  }
}

export class EventComponent {
}
