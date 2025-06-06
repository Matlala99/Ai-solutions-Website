import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../services/feedback.Service';
import { Feedback } from '../../models/Feedback';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-feedback-management',
  templateUrl: './feedback-management.component.html',
  imports: [
    NgForOf
  ],
  styleUrls: ['./feedback-management.component.css']
})
export class FeedbackManagementComponent implements OnInit {
  feedbackList: Feedback[] = [];

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.loadFeedback();
  }

  loadFeedback() {
    this.feedbackService.getFeedback().subscribe({
      next: (feedback) => {
        this.feedbackList = feedback;
      },
      error: (error) => {
        console.error('Error:', error);
        alert('Error loading feedback. Please try again.');
      }
    });
  }

  deleteFeedback(id: number) {
    if (confirm('Are you sure you want to delete this feedback?')) {
      this.feedbackService.deleteFeedback(id).subscribe({
        next: () => {
          this.loadFeedback();
        },
        error: (error) => {
          console.error('Error:', error);
          alert('Error deleting feedback. Please try again.');
        }
      });
    }
  }
}
