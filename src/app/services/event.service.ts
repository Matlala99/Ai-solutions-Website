import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:8080/api/events';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching events:', error);
        return throwError(() => new Error('Failed to fetch events. Please try again later.'));
      })
    );
  }

  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.apiUrl, event).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error creating event:', error);
        return throwError(() => new Error('Failed to create event. Please try again later.'));
      })
    );
  }

  updateEvent(event: Event): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/${event.id}`, event).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error updating event:', error);
        return throwError(() => new Error('Failed to update event. Please try again later.'));
      })
    );
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error deleting event:', error);
        return throwError(() => new Error('Failed to delete event. Please try again later.'));
      })
    );
  }
}
