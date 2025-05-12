import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private orders = signal<any[]>([]);
  readonly orders$ = this.orders.asReadonly();

  constructor(private http: HttpClient) {}

  load() {
    this.http.get<any[]>('http://localhost:3000/api/orders')
      .subscribe(data => this.orders.set(data));
  }

  placeOrder(order: { user_id: number; product_id: number; quantity: number }) {
    return this.http.post('http://localhost:3000/api/orders', order);
  }

  addToList(order: any) {
    this.orders.update((prev) => [order, ...prev]);
  }
}
