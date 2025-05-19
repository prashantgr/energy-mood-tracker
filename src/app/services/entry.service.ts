
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EntryService {
  private http = inject(HttpClient);

   // Replace with your actual Logic App URL
  private logicAppUrl = 'https://prod-97.westeurope.logic.azure.com:443/workflows/b19eff419f504332998ecd1750f0d738/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=WI7Mbm5ZSlPoVmDFuSPOU_52m3HZt8UQ0dfpl6rSkbM';

  submit(entry: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.logicAppUrl, entry, { headers });
  }
}
