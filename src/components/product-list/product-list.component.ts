import { Component, OnInit, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { ProductService } from '../../services/product.service';
// import { Product } from '../../asset';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgFor],
  styleUrls: ['./product-list.component.scss'],
  template: `
    <div class="products-grid">
      <div class="product-card" *ngFor="let p of productService.products$()">
        <img src="../../assets/shirt.jpg" alt="{{p.name}}" />
        <h3>{{ p.name }}</h3>
        <p>{{ p.description }}</p>
        <div class="price">₹{{ p.price }}</div>
      </div>
    </div>
  `
})
export class ProductListComponent implements OnInit {
  productService = inject(ProductService);
  ngOnInit() {
    this.productService.load();
  }
}
