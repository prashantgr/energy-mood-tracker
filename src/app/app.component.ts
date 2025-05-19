import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <nav>
      <a routerLink="/input">Energy Input</a> |
      <a routerLink="/voice">voice</a> |
      <a routerLink="/dashboard">Dashboard</a> |
      <a routerLink="/insight">Mood Insight</a> |
      <a routerLink="/team">Team Overview</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
