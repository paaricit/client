import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { ProductService } from '../../services/product.service';

import { NgIf } from '@angular/common';
import { LivestreamService } from '../../services/livestreams.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgIf],
  styleUrls: ['./dashboard.component.scss'],
  template: `
    <h2 class="title">📊 Dashboard Overview</h2>

    <div class="dashboard-cards">
      <div class="card metric">
        <h3>Total Orders</h3>
        <div class="value">{{ totalOrders() }}</div>
      </div>

      <div class="card metric">
        <h3>Total Products</h3>
        <div class="value">{{ totalProducts() }}</div>
      </div>

      <div class="card metric">
        <h3>Total Revenue</h3>
        <div class="value">₹{{ totalRevenue() }}</div>
      </div>

      <div class="card metric">
        <h3>Active Livestreams</h3>
        <div class="value">{{ liveCount() }}</div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  orderService = inject(OrderService);
  productService = inject(ProductService);
  livestreamService = inject(LivestreamService);

  totalOrders = computed(() => this.orderService.orders$().length);
  totalProducts = computed(() => this.productService.products$().length);
  totalRevenue = computed(() =>
    this.orderService.orders$().reduce((sum, o) => sum + (o.total_price || 0), 0)
  );
  liveCount = computed(() =>
    this.livestreamService.livestreams$().filter((s) => s.status === 'live').length
  );

  ngOnInit() {
    this.orderService.load();
    this.productService.load();
    this.livestreamService.load();
  }
}
