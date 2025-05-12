import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { NavbarComponent } from '../components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, NavbarComponent],
  template: `
    <div class="layout">
      <app-sidebar></app-sidebar>
      <div class="main">
        <app-navbar></app-navbar>
        <main class="content">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .layout {
      display: flex;
      height: 100vh;
    }

    .main {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .content {
      padding: 24px;
      flex-grow: 1;
      background-color: #f9fafb;
      overflow-y: auto;
    }
  `]
})
export class AppComponent {}
