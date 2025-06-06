import { Component, OnInit } from '@angular/core';
import { InquiryService } from '../../services/inquiry.service';
import { Inquiry } from '../../models/inquiry';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-inquiry-management',
  templateUrl: './inquiry-management.component.html',
  imports: [
    NgForOf
  ],
  styleUrls: ['./inquiry-management.component.css']
})
export class InquiryManagementComponent implements OnInit {
  inquiries: Inquiry[] = [];

  constructor(private inquiryService: InquiryService) {}

  ngOnInit(): void {
    this.loadInquiries();
  }

  loadInquiries() {
    this.inquiryService.getInquiries().subscribe({
      next: (inquiries) => {
        console.log('Inquiries:', inquiries); // Log the data
        this.inquiries = inquiries;
      },
      error: (error) => {
        console.error('Error:', error);
        alert('Error loading inquiries. Please try again.');
      }
    });
  }

  deleteInquiry(id: number) {
    if (confirm('Are you sure you want to delete this inquiry?')) {
      this.inquiryService.deleteInquiry(id).subscribe({
        next: () => {
          this.loadInquiries();
        },
        error: (error) => {
          console.error('Error:', error);
          alert('Error deleting inquiry. Please try again.');
        }
      });
    }
  }
}
