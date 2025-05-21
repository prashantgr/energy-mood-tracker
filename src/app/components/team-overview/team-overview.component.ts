import { Component, OnInit } from '@angular/core';
import { SentimentSummaryService, SentimentSummary } from '../../services/sentiment-summary.service';
import { ChartConfiguration } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import 'chartjs-adapter-date-fns';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-team-overview',
  standalone: true,
  imports: [CommonModule, NgChartsModule, HttpClientModule],
  templateUrl: './team-overview.component.html',
  styleUrls: ['./team-overview.component.scss']
})
export class TeamOverviewComponent implements OnInit {
  sentimentData: SentimentSummary[] = [];

  chartData: ChartConfiguration<'scatter'>['data'] = {
    datasets: []
  };

  chartReady = false;
  chartType: 'scatter' = 'scatter';

  chartOptions: ChartConfiguration<'scatter'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom'
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const moodLabels = ['Neutral', 'Low Energy', 'Burned Out', 'Motivated', 'Anxious', 'Optimistic'];
            const yIndex = context.parsed.y;
            const xDate = new Date(context.parsed.x);
            const moodLabel = moodLabels[yIndex] ?? 'Unknown';
            return `${moodLabel} (${xDate.toLocaleDateString()})`;
          }
        }
      }
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day'
        },
        title: {
          display: true,
          text: 'Entry Date'
        }
      },
      y: {
        ticks: {
          stepSize: 1,
          callback: (value) => {
            const moodLabels = ['Neutral', 'Low Energy', 'Burned Out', 'Motivated', 'Anxious', 'Optimistic'];
            return moodLabels[value as number] ?? 'Unknown';
          }
        },
        title: {
          display: true,
          text: 'Mood Category'
        },
        min: 0,
        max: 5
      }
    }
  };

  constructor(private sentimentService: SentimentSummaryService) {}

  ngOnInit() {
    this.sentimentService.getSentimentSummary().subscribe(data => {
      this.sentimentData = data;
      this.prepareChartData();
    });
  }

  private prepareChartData() {
    const moodMap: Record<string, number> = {
      'Neutral': 0,
      'Low Energy': 1,
      'Burned Out': 2,
      'Motivated': 3,
      'Anxious': 4,
      'Optimistic': 5
    };

    const grouped: Record<string, { x: number; y: number }[]> = {};

    for (const entry of this.sentimentData) {
      if (!grouped[entry.EmployeeId]) {
        grouped[entry.EmployeeId] = [];
      }
      grouped[entry.EmployeeId].push({
        x: new Date(entry.EntryDate).getTime(),
        y: moodMap[entry.MoodCategory] ?? 0
      });
    }

    const colors = this.generateColors(Object.keys(grouped).length);

    this.chartData.datasets = Object.entries(grouped).map(([empId, data], index) => ({
      label: `Employee ${empId}`,
      data,
      parsing: {
        xAxisKey: 'x',
        yAxisKey: 'y'
      },
      pointBackgroundColor: colors[index],
      pointBorderColor: colors[index],
      pointRadius: 6,
      pointHoverRadius: 8
    }));

    this.chartReady = true;
  }

  private generateColors(count: number): string[] {
    const baseColors = [
      '#42A5F5', '#66BB6A', '#FFA726', '#AB47BC',
      '#FF7043', '#26C6DA', '#D4E157', '#FFCA28',
      '#8D6E63', '#78909C', '#5C6BC0', '#26A69A'
    ];
    return Array.from({ length: count }, (_, i) => baseColors[i % baseColors.length]);
  }
}
