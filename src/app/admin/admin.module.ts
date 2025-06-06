import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { InquiryManagementComponent } from './inquiry-management/inquiry-management.component';
import { FeedbackManagementComponent } from './feedback-management/feedback-management.component';
import { ArticleManagementComponent } from './article-management/article-management.component';
import { EventManagementComponent } from './event-management/event-management.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AdminDashboardComponent,
    InquiryManagementComponent,
    ArticleManagementComponent,
    EventManagementComponent,
    FeedbackManagementComponent
  ]
})
export class AdminModule { }
