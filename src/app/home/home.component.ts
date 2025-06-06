import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../services/feedback.Service';
import {NgForOf, NgOptimizedImage} from '@angular/common';
import { RouterLink } from '@angular/router';
import { Feedback } from '../models/Feedback';
import {ChatbotComponent} from './chatbot/chatbot.component'; // Import the Feedback interface

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [
    NgForOf,
    RouterLink,
    ChatbotComponent,

  ],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  testimonials: Feedback[] = []; // Store fetched feedback data

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.fetchTestimonials();
  }

  fetchTestimonials(): void {
    this.feedbackService.getFeedback().subscribe({
      next: (data) => {
        // Get the latest 2 feedback entries
        this.testimonials = data.slice(-2);
      },
      error: (error) => {
        console.error('Error fetching feedback:', error);
      }
    });
  }

  // Helper method to convert rating to stars
  getStarRating(rating: number): string {
    const fullStars = '★'.repeat(rating);
    const emptyStars = '☆'.repeat(5 - rating);
    return fullStars + emptyStars;
  }

}
