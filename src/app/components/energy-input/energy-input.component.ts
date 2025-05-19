import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EntryService } from '../../services/entry.service';
import { SentimentService } from '../../services/sentiment.service';


@Component({
  selector: 'app-energy-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './energy-input.component.html',
  styleUrls: ['./energy-input.component.scss']
})
export class EnergyInputComponent {
  moodText = '';
  energy: 'Low' | 'Medium' | 'High' = 'Medium';
  focus: 'Distracted' | 'Moderate' | 'Focused' = 'Moderate';
  stress: 'Low' | 'Medium' | 'High' = 'Medium';

  submitting = false;
  submitted = false;
  error = '';
  moodCategory: { label: string, color: string, emoji: string, description: string } | null = null;

  constructor(
    private entryService: EntryService,
    private sentimentService: SentimentService
  ) {}

  submitEntry() {
    this.submitting = true;
    this.submitted = false;
    this.error = '';
    this.moodCategory = null;

    this.sentimentService.analyzeSentiment(this.moodText).subscribe({
      next: res => {
        const sentiment = res.sentiment;
        const confidence = res.confidenceScores;

        this.moodCategory = this.getMoodCategory(
          sentiment,
          this.energy,
          this.focus,
          this.stress,
          this.moodText
        );

        const entry = {
          date: new Date(),
          moodText: this.moodText,
          sentiment,
          confidence,
          energy: this.energy,
          focus: this.focus,
          stress: this.stress,
          moodCategory: this.moodCategory
        };

        this.entryService.submit(entry).subscribe({
          next: () => {
            this.submitted = true;
            this.submitting = false;
            this.moodText = '';

            setTimeout(() => {
              this.submitted = false;
              this.moodCategory = null;
            }, 10000);
          },
          error: err => {
            console.error(err);
            this.error = 'Failed to submit entry.';
            this.submitting = false;
          }
        });
      },
      error: err => {
        console.error(err);
        this.error = 'Sentiment analysis failed.';
        this.submitting = false;
      }
    });
  }

  getMoodCategory(
    sentiment: string,
    energy: string,
    focus: string,
    stress: string,
    moodText: string
  ): { label: string, color: string, emoji: string, description: string } {
    moodText = moodText.toLowerCase();

    if (energy === 'Low' && stress === 'High') {
      return { label: 'Burned Out', color: '#e57373', emoji: '😩', description: 'You may need rest and support.' };
    }
    if (energy === 'High' && focus === 'Focused' && stress === 'Low') {
      return { label: 'Motivated', color: '#81c784', emoji: '💪', description: 'You seem to be in a great groove!' };
    }
    if (stress === 'High' && (moodText.includes('worried') || moodText.includes('anxious'))) {
      return { label: 'Anxious', color: '#ffd54f', emoji: '😟', description: 'Try mindfulness or talk to someone.' };
    }
    if (sentiment === 'positive' && energy !== 'Low') {
      return { label: 'Optimistic', color: '#64b5f6', emoji: '😊', description: 'Stay confident and keep going!' };
    }
    if (energy === 'Low') {
      return { label: 'Low Energy', color: '#b0bec5', emoji: '😴', description: 'Maybe take a short break?' };
    }

    return { label: 'Neutral', color: '#90caf9', emoji: '😐', description: 'Balanced mood, stay steady.' };
  }
}
