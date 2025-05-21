
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SentimentResult {
  sentiment: string;
  confidenceScores: {
    positive: number;
    neutral: number;
    negative: number;
  };
}

@Injectable({ providedIn: 'root' })
export class SentimentService {
  private http = inject(HttpClient);

  // ⚠️ Secure these in environment.ts for production builds
  private endpoint = 'https://youAPI.cognitiveservices.azure.com/';
  private apiKey = '';
  private apiUrl = `${this.endpoint}text/analytics/v3.1/sentiment`;

  analyzeSentiment(text: string): Observable<any> {
    const headers = new HttpHeaders({
      'Ocp-Apim-Subscription-Key': this.apiKey,
      'Content-Type': 'application/json'
    });

    const body = {
      documents: [
        {
          language: 'en',
          id: '1',
          text
        }
      ]
    };

    return this.http.post(this.apiUrl, body, { headers });
  }
}
