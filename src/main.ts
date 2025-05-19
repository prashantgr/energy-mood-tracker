import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';  // <--- PROVIDER here!
import { provideRouter } from '@angular/router';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),   // THIS PROVIDES HttpClient INJECTOR
    provideRouter(routes)
  ]
}).catch(err => console.error(err));
