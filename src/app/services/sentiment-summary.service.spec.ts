import { TestBed } from '@angular/core/testing';

import { SentimentSummaryService } from './sentiment-summary.service';

describe('SentimentSummaryService', () => {
  let service: SentimentSummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SentimentSummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
