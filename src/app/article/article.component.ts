import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { Article } from '../models/article';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-articles',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  imports: [
    DatePipe,
    NgForOf,
    NgIf,
    NgClass,
  ],
  standalone: true // Add this if you're using standalone components
})
export class ArticlesComponent implements OnInit {
  articles: {
    id?: number;
    title: string;
    author: string;
    content: string;
    postedAt?: Date;
    authorId: number;
    imageUrl: string | null;
    isExpanded: boolean
  }[] = [];
  isLoading = true; // Add a loading state
  errorMessage: string | null = null; // Add an error message

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  // Fetch articles from the service
  loadArticles(): void {
    this.articleService.getArticles().subscribe({
      next: (articles) => {
        // Prepend the base URL to the imageUrl if it's not already included
        this.articles = articles.map(article => ({
          ...article,
          imageUrl: article.imageUrl ? `http://localhost:8080/uploads/${article.imageUrl}` : null,
          isExpanded: false // Default to collapsed state
        }));
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading articles:', error);
        this.errorMessage = 'Failed to load articles. Please try again later.';
        this.isLoading = false;
      },
    });
  }
  // Toggle the expanded state of an article
  toggleReadMore(article: Article): void {
    article.isExpanded = !article.isExpanded;
  }
}

export class ArticleComponent {
}
