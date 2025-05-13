import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { LivestreamService } from '../../services/livestreams.service';

@Component({
  selector: 'app-livestreams',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe],
  template: `
    <h2 class="title">🎥 Live & Upcoming Streams</h2>

    <div class="stream-list">
      <div class="stream-card" *ngFor="let s of store.livestreams$()">
        <img src="../../assets/reach.png" alt="thumbnail" />
        <div class="details">
          <h3>{{ s.title }}</h3>
          <p><strong>Status:</strong> {{ s.status }}</p>
          <p><strong>Time:</strong> {{ s.scheduled_time | date:'short' }}</p>
          <button (click)="openChat(s)">💬 Chat</button>
        </div>
      </div>
    </div>

    <div class="chat-modal" *ngIf="selectedStream">
      <div class="modal-content">
        <h3>{{ selectedStream.title }} Chat</h3>
        <p>(This is where chat messages will appear...)</p>
        <button class="close-btn" (click)="selectedStream = null">Close</button>
      </div>
    </div>
  `,
  styleUrls: ['./livestreams.component.scss'],
})
export class LivestreamsComponent implements OnInit {
  store = inject(LivestreamService);
  selectedStream: any = null;

  ngOnInit() {
    this.store.load();
   
  }

  openChat(stream: any) {
    this.selectedStream = stream;
  }
}
