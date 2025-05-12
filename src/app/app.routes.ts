// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { ProductListComponent } from '../components/product-list/product-list.component';
import { LivestreamsComponent } from '../components/livestreams/livestreams.component';
import { OrdersComponent } from '../components/orders/orders.component';


export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'livestreams', component: LivestreamsComponent },
  { path: 'orders', component: OrdersComponent },
];
