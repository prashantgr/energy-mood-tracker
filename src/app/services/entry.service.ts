
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class EntryService {
  private http = inject(HttpClient);

   // Replace with your actual Logic App URL
  private logicAppUrl ='';
  submit(entry: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.logicAppUrl, entry, { headers });
  }
}
