import { Route } from '@angular/router';
import { EnergyInputComponent } from './components/energy-input/energy-input.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MoodInsightComponent } from './components/mood-insight/mood-insight.component';
import { TeamOverviewComponent } from './components/team-overview/team-overview.component';

// Define your routes here
export const appRoutes: Route[] = [
  { path: '', redirectTo: '/input', pathMatch: 'full' },
  { path: 'input', component: EnergyInputComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'insight', component: MoodInsightComponent },
  { path: 'team', component: TeamOverviewComponent },
  { path: '**', redirectTo: '/input' } // Handle unknown routes
];
