import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface to match stored proc result structure
export interface SentimentSummary {
  EmployeeId: string;
  EntryDate: string;
  PositiveCount: number;
  NeutralCount: number;
  NegativeCount: number;
  TotalEntries: number;
  NegativeRatio: number;
  PositiveRatio: number;
  AddressConcernsFlag: number;
  CelebratePositivesFlag: number;
  WeekNumber: number;
  MoodCategory: string;
  Sentiment: string;
  Suggestion: string;
}

@Injectable({
  providedIn: 'root'
})
export class SentimentSummaryService {
  private http = inject(HttpClient);

  // Replace with your Logic App or API endpoint URL
  private summaryUrl = '';  
  getSentimentSummary(): Observable<SentimentSummary[]> {
    return this.http.get<SentimentSummary[]>(this.summaryUrl);
  }
}
