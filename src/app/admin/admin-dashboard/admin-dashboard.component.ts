import { Component, OnInit } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { InquiryService } from '../../services/inquiry.service';
import { FeedbackService } from '../../services/feedback.Service';
import { ArticleService } from '../../services/article.service';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  imports: [
    RouterLink
  ],
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  totalInquiries: number = 0;
  totalFeedback: number = 0;
  totalArticles: number = 0;
  totalEvents: number = 0;

  constructor(
    private router: Router,
    private inquiryService: InquiryService,
    private feedbackService: FeedbackService,
    private articleService: ArticleService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats() {
    this.inquiryService.getInquiries().subscribe((inquiries) => {
      this.totalInquiries = inquiries.length;
    });

    this.feedbackService.getFeedback().subscribe((feedback) => {
      this.totalFeedback = feedback.length;
    });

    this.articleService.getArticles().subscribe((articles) => {
      this.totalArticles = articles.length;
    });

    this.eventService.getEvents().subscribe((events) => {
      this.totalEvents = events.length;
    });
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }
}
