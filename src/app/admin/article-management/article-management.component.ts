import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article';
import { FormsModule, NgForm } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-article-management',
  templateUrl: './article-management.component.html',
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./article-management.component.css']
})
export class ArticleManagementComponent implements OnInit {
  articles: Article[] = [];
  article: Article = {
    title: '',
    author: '',
    content: '',
    authorId: 0
  };
  isEditing: boolean = false;
  selectedFile: File | null = null;

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles() {
    this.articleService.getArticles().subscribe({
      next: (articles) => {
        this.articles = articles;
      },
      error: (error) => {
        console.error('Error:', error);
        alert('Error loading articles. Please try again.');
      }
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
  onSubmit(form: NgForm) {
    if (form.invalid) {
      alert('Please fill out all required fields.');
      return;
    }

    const formData = new FormData();
    const articleJson = JSON.stringify({
      title: this.article.title,
      author: this.article.author,
      content: this.article.content,
      authorId: this.article.authorId
    });
    formData.append('article', new Blob([articleJson], { type: 'application/json' }));

    if (this.selectedFile) {
      formData.append('imageFile', this.selectedFile); // Match the backend's expected field name
    }

    this.articleService.createArticle(formData).subscribe({
      next: () => {
        this.loadArticles();
        this.resetForm(form);
      },
      error: (error) => {
        console.error('Error:', error);
        alert('Error creating article. Please try again.');
      }
    });
  }

  resetForm(form: NgForm) {
    form.resetForm();
    this.article = {
      title: '',
      author: '',
      content: '',
      authorId: 0
    };
    this.isEditing = false;
    this.selectedFile = null;
  }
}
