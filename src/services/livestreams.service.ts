import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class LivestreamService {
  private livestreams = signal<any[]>([]);
  readonly livestreams$ = this.livestreams.asReadonly();

  constructor(private http: HttpClient) {}

  load() {
    this.http.get<any[]>('http://localhost:3000/api/livestreams')
      .subscribe(data => this.livestreams.set(data));
  }
}
