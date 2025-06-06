import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { InquiryManagementComponent } from './inquiry-management/inquiry-management.component';
import { FeedbackManagementComponent } from './feedback-management/feedback-management.component';
import { ArticleManagementComponent } from './article-management/article-management.component';
import { EventManagementComponent } from './event-management/event-management.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  { path: '', component: AdminDashboardComponent, canActivate: [] },
  { path: 'inquiries', component: InquiryManagementComponent, canActivate: [] },
  { path: 'feedback', component: FeedbackManagementComponent, canActivate: [] },
  { path: 'articles', component: ArticleManagementComponent, canActivate: [] },
  { path: 'events', component: EventManagementComponent, canActivate: [] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
