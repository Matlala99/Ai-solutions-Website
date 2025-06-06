import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Feedback } from '../models/Feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = 'http://localhost:8080/api/feedback';

  constructor(private http: HttpClient) {}

  submitFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(this.apiUrl, feedback).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error submitting feedback:', error);
        return throwError(() => new Error('Failed to submit feedback. Please try again later.'));
      })
    );
  }
  getFeedback(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>('http://localhost:8080/api/feedback').pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching feedback:', error.message);
        return throwError(() => new Error('Failed to fetch feedback. Please try again later.'));
      })
    );
  }
  deleteFeedback(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
