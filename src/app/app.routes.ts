import { Routes } from '@angular/router';
import { EnergyInputComponent } from './components/energy-input/energy-input.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MoodInsightComponent } from './components/mood-insight/mood-insight.component';
import { TeamOverviewComponent } from './components/team-overview/team-overview.component';
import { VoiceInputComponent } from './components/voice-input/voice-input.component';

export const routes: Routes = [
  { path: 'input', component: EnergyInputComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'insight', component: MoodInsightComponent },
  { path: 'team', component: TeamOverviewComponent },
   { path: 'voice', component: VoiceInputComponent },
  { path: '', redirectTo: '/input', pathMatch: 'full' },
  { path: '**', redirectTo: '/input' }
];
