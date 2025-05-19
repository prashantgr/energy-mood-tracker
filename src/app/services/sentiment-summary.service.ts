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
}

@Injectable({
  providedIn: 'root'
})
export class SentimentSummaryService {
  private http = inject(HttpClient);

  // Replace with your Logic App or API endpoint URL
  private summaryUrl = 'https://prod-82.westeurope.logic.azure.com:443/workflows/1f3643bd798c4af3b565c9366cc5fa9d/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=43UYqwI4XsAB4kmGdyL6v4lq6MnXy3Np_jSRY5FyzVU';

  getSentimentSummary(): Observable<SentimentSummary[]> {
    return this.http.get<SentimentSummary[]>(this.summaryUrl);
  }
}
