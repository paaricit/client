import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  styleUrls: ['./navbar.component.scss'],
  template: `
    <header class="navbar">
      <div class="brand">📊 Dashboard</div>
      <div class="actions">
        <!-- Add dark mode toggle or user menu here -->
        <div class="avatar">👤</div>
      </div>
    </header>
  `
})
export class NavbarComponent {}
