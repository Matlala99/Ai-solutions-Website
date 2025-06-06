import { Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import {EventsComponent} from './event/event.component';
import {ArticlesComponent} from './article/article.component';
import {FeedbackComponent} from './feedback/feedback.component';
import {LoginComponent} from './login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'events', component: EventsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) } // Lazy load AdminModule
];
