import { Component } from '@angular/core';
import { EntryService } from '../../services/entry.service';
import { SentimentService } from '../../services/sentiment.service';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-voice-input',
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './voice-input.component.html',
  styleUrls: ['./voice-input.component.scss']
})


export class VoiceInputComponent {
  transcript = '';
  sentimentResult = '';
  confidence: any = null;
  recording = false;
  sentimentLoading = false;
  private recognition: any;

  constructor(private sentimentService: SentimentService) {
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'en-US';
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;

    this.recognition.onresult = (event: any) => {
      this.transcript = event.results[0][0].transcript;
      this.recording = false;
      this.analyzeSentiment(this.transcript);
    };

    this.recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      this.recording = false;
    };

    this.recognition.onend = () => {
      this.recording = false;
    };
  }

  toggleRecording() {
    if (!this.recording) {
      this.recognition.start();
      this.recording = true;
    } else {
      this.recognition.stop();
      this.recording = false;
    }
  }

  analyzeSentiment(text: string) {
    this.sentimentLoading = true;
    this.sentimentService.analyzeSentiment(text).subscribe({
      next: (res) => {
        const document = res.documents[0];
        this.sentimentResult = document.sentiment;
        this.confidence = document.confidenceScores;
        this.sentimentLoading = false;
      },
      error: (err) => {
        console.error('Sentiment API error:', err);
        this.sentimentResult = 'Error analyzing sentiment';
        this.sentimentLoading = false;
      }
    });
  }
}
