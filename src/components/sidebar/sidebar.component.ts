import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  styleUrls: ['./sidebar.component.scss'],
  template: `
    <aside class="sidebar">
      <div class="logo">🛒 Linach</div>

      <nav class="nav">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">🏠 Dashboard</a>
        <a routerLink="/products" routerLinkActive="active">📦 Products</a>
        <a routerLink="/livestreams" routerLinkActive="active">🎥 Livestreams</a>
        <a routerLink="/orders" routerLinkActive="active">🧾 Orders</a>
      </nav>
    </aside>
  `
})
export class SidebarComponent {}
