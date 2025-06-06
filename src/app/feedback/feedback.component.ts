import { Component, OnInit } from '@angular/core';
import { Feedback } from '../models/Feedback';
import { FeedbackService } from '../services/feedback.Service';
import { FormsModule, NgForm } from '@angular/forms';
import { DatePipe, NgForOf } from '@angular/common';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  imports: [
    FormsModule,
    NgForOf,
    DatePipe
  ],
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  feedback: Feedback = {
    name: '',
    rating: 5,
    comments: ''
  };

  feedbackList: Feedback[] = [];

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.loadFeedback();
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      alert('Please fill out all required fields.');
      return;
    }

    const feedbackPayload = {
      ...this.feedback,
      submittedAt: new Date().toISOString() // Add current timestamp in ISO format
    };

    this.feedbackService.submitFeedback(feedbackPayload).subscribe({
      next: (_) => {
        alert('Feedback submitted successfully!');
        this.resetForm(form);
        this.loadFeedback();
      },
      error: (error) => {
        console.error('Error:', error);
        const errorMessage = error.error?.message || 'Error submitting feedback. Please try again.';
        alert(errorMessage);
      }
    });
  }

  loadFeedback() {
    this.feedbackService.getFeedback().subscribe({
      next: (feedback) => {
        this.feedbackList = feedback;
      },
      error: (error) => {
        console.error('Error:', error);
        const errorMessage = error.error?.message || 'Error loading feedback. Please try again.';
        alert(errorMessage);
      }
    });
  }

  resetForm(form: NgForm) {
    form.resetForm({
      name: '',
      rating: 5, // Reset rating to default value
      comments: ''
    });
    this.feedback = {
      name: '',
      rating: 5,
      comments: ''
    };
  }
}
