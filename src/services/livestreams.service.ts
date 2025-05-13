import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MOCK_LIVESTREAMS } from '../data/mock-livestream';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LivestreamService {

  private livestreams = signal<any[]>([]);

  readonly livestreams$ = this.livestreams.asReadonly();

  readonly liveStreams$ = computed(() =>
    this.livestreams().filter((stream) => stream.status === 'live')
  );

  constructor(private http: HttpClient) { }


  load(): void {

    of(MOCK_LIVESTREAMS).subscribe((data) => this.livestreams.set(data));

    // this.http.get<any[]>('http://localhost:3000/api/livestreams')
    //   .subscribe((data) => this.livestreams.set(data));
  }

  clear(): void {
    this.livestreams.set([]);
  }
}
