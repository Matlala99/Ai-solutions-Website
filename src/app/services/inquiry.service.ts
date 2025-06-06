import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inquiry } from '../models/inquiry';

@Injectable({
  providedIn: 'root' // Provided in the root injector
})
export class InquiryService {
  private apiUrl = 'http://localhost:8080/api/inquiries';

  constructor(private http: HttpClient) {} // HttpClient is now available

  submitInquiry(inquiry: Inquiry): Observable<Inquiry> {
    return this.http.post<Inquiry>(this.apiUrl, inquiry);

  }getInquiries(): Observable<Inquiry[]> {
    return this.http.get<Inquiry[]>(`${this.apiUrl}`);
  }

  deleteInquiry(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
