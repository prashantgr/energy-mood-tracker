import { Component, OnInit } from '@angular/core';
import { SentimentSummaryService, SentimentSummary } from '../../services/sentiment-summary.service';
import { CommonModule } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [CommonModule, HttpClientModule] 
})
export class DashboardComponent implements OnInit {
  sentimentData: SentimentSummary[] = [];
  loading = true;
  error: string | null = null;

  constructor(private sentimentSummaryService: SentimentSummaryService) {}

  ngOnInit() {
    this.sentimentSummaryService.getSentimentSummary().subscribe({
      next: data => {
        this.sentimentData = data;
        this.loading = false;
      },
      error: err => {
        this.error = 'Failed to load sentiment summary data';
        this.loading = false;
      }
    });
  }
}
