import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event';
import {FormsModule, NgForm} from '@angular/forms';
import {DatePipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-event-management',
  templateUrl: './event-management.component.html',
  imports: [
    FormsModule,
    DatePipe,
    NgIf,
    NgForOf
  ],
  styleUrls: ['./event-management.component.css']
})
export class EventManagementComponent implements OnInit {
  events: Event[] = [];
  event: Event = {
    title: '',
    description: '',
    dateTime: new Date(),
    location: '',
    registrationLink: ''
  };
  isEditing: boolean = false;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getEvents().subscribe({
      next: (events) => {
        this.events = events;
      },
      error: (error) => {
        console.error('Error:', error);
        alert('Error loading events. Please try again.');
      }
    });
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      alert('Please fill out all required fields.');
      return;
    }

    if (this.isEditing) {
      this.eventService.updateEvent(this.event).subscribe({
        next: () => {
          this.loadEvents();
          this.resetForm(form);
        },
        error: (error) => {
          console.error('Error:', error);
          alert('Error updating event. Please try again.');
        }
      });
    } else {
      this.eventService.createEvent(this.event).subscribe({
        next: () => {
          this.loadEvents();
          this.resetForm(form);
        },
        error: (error) => {
          console.error('Error:', error);
          alert('Error creating event. Please try again.');
        }
      });
    }
  }

  editEvent(event: Event) {
    this.event = { ...event };
    this.isEditing = true;
  }

  deleteEvent(id: number) {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(id).subscribe({
        next: () => {
          this.loadEvents();
        },
        error: (error) => {
          console.error('Error:', error);
          alert('Error deleting event. Please try again.');
        }
      });
    }
  }

  resetForm(form: NgForm) {
    form.resetForm();
    this.event = {
      title: '',
      description: '',
      dateTime: new Date(),
      location: '',
      registrationLink: ''
    };
    this.isEditing = false;
  }
}
