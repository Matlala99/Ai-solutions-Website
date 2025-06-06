import { Component } from '@angular/core';
import { Inquiry } from '../models/inquiry';
import { InquiryService } from '../services/inquiry.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule for standalone components
import { Router } from '@angular/router'; // Optional: For navigation after submission

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  imports: [
    FormsModule,
    CommonModule // Add CommonModule for *ngIf or other common directives
  ],
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  inquiry: Inquiry = {
    name: '',
    email: '',
    phoneNumber: '',
    companyName: '',
    country: '',
    jobTitle: '',
    jobDetails: ''
  };

  isSubmitting: boolean = false; // Track form submission state
  submissionError: string | null = null; // Track submission errors

  constructor(
    private inquiryService: InquiryService,
    private router: Router // Optional: For navigation after submission
  ) {}

  onSubmit() {
    if (this.isSubmitting) return; // Prevent multiple submissions

    this.isSubmitting = true;
    this.submissionError = null;

    this.inquiryService.submitInquiry(this.inquiry).subscribe({
      next: (_) => {
        alert('Inquiry submitted successfully!');
        this.resetForm();
        this.router.navigate(['/thank-you']); // Optional: Navigate to a thank-you page
      },
      error: (error) => {
        console.error('Error submitting inquiry:', error);
        this.submissionError = 'Error submitting inquiry. Please try again.'; // Display error to the user
      },
      complete: () => {
        this.isSubmitting = false; // Reset submission state
      }
    });
  }

  resetForm() {
    this.inquiry = {
      name: '',
      email: '',
      phoneNumber: '',
      companyName: '',
      country: '',
      jobTitle: '',
      jobDetails: ''
    };
  }
}
