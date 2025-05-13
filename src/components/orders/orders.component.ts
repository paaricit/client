import { Component, OnInit, inject, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-orders',
  imports: [NgFor, FormsModule],

  styleUrls: ['./orders.component.scss'],
  template: `
    <h2 class="title">🧾 Orders</h2>

    <form (ngSubmit)="placeOrder()" class="order-form">
      <label>Product:</label>
      <select [(ngModel)]="selectedProductId" name="product_id" required>
        <option *ngFor="let p of productService.products$()" [value]="p.id">{{ p.name }}</option>
      </select>

      <label>Quantity:</label>
      <input type="number" [(ngModel)]="quantity" name="quantity" min="1" required />

      <button type="submit">Place Order</button>
    </form>

    <div class="order-list">
      <div class="order-card" *ngFor="let o of orderService.orders$()">
        <p><strong>User:</strong> #{{ o.user_id }}</p>
        <p><strong>Product:</strong> #{{ o.product_id }}</p>
        <p><strong>Qty:</strong> {{ o.quantity }}</p>
        <p><strong>Total:</strong> ₹{{ o.total_price }}</p>
        <p><strong>Status:</strong> {{ o.status }}</p>
      </div>
    </div>
  `
})
export class OrdersComponent implements OnInit {
  orderService = inject(OrderService);
  productService = inject(ProductService);

  selectedProductId = 1;
  quantity = 1;
  user_id = 3; // hardcoded viewer for demo

  ngOnInit() {
    this.orderService.load();
    this.productService.load();
  }

  placeOrder() {
    const newOrder = {
      user_id: this.user_id,
      product_id: this.selectedProductId,
      quantity: this.quantity,
    };

    // this.orderService.placeOrder(newOrder).subscribe((res: any) => {
    this.orderService.addToList({ ...newOrder, ...newOrder, status: 'pending' });
    this.quantity = 1;
    // });
  }
}
