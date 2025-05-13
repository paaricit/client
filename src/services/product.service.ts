import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { MOCK_PRODUCTS } from '../data/mock-product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private products = signal<any[]>([]);
  readonly products$ = this.products.asReadonly();

  constructor(private http: HttpClient) {}

  load() {
    of(MOCK_PRODUCTS).subscribe(data => this.products.set(data));
    // this.http.get<any[]>('http://localhost:3000/api/products')
    //   .subscribe(data => this.products.set(data));
  }
}
