import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { ProductService } from '../../services/product.service';

import { NgIf } from '@angular/common';
import { LivestreamService } from '../../services/livestreams.service';
import { DashboardSignalStore } from '../../store/dashboard.store';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  styleUrls: ['./dashboard.component.scss'],
  template: `
    <h2 class="title">📊 Dashboard Overview</h2>

    <div class="dashboard-cards">
      <div class="card metric">
        <h3>Total Orders</h3>
        <div class="value">{{ store.totalOrders() }}</div>
      </div>

      <div class="card metric">
        <h3>Total Products</h3>
        <div class="value">{{ store.totalProducts() }}</div>
      </div>

      <div class="card metric">
        <h3>Total Revenue</h3>  
        <div class="value">₹{{ store.totalRevenue() }}</div>
      </div>

      <div class="card metric">
        <h3>Active Livestreams</h3>
        <div class="value">{{ store.liveCount() }}</div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  store = inject(DashboardSignalStore);
  orderService = inject(OrderService);
  productService = inject(ProductService);
  livestreamService = inject(LivestreamService);
  ngOnInit() {
    this.orderService.load();
    this.productService.load();
    this.livestreamService.load();
    // this.store.load();
  }
}
