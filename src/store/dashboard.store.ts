import { computed, inject, Injectable } from "@angular/core";
import { signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { OrderService } from "../services/order.service";
import { ProductService } from "../services/product.service";
import { LivestreamService } from "../services/livestreams.service";

export const initialValue = {
  totalOrders: 0,
  totalProducts: 0,
  totalRevenue: 0,
  liveCount: 0,
}

export const dashboardStore = signalStore(
  { providedIn: 'root' },
  withState({}),
  withComputed(() => {
    const orderService = inject(OrderService);
    const productService = inject(ProductService);
    const livestreamService = inject(LivestreamService);
    return {
      totalOrders: computed(() => orderService.orders$().length),
      totalProducts: computed(() => productService.products$().length),
      totalRevenue: computed(() => {
        const orders = orderService.orders$();
        return orders.reduce((acc, order) => acc + order.totalPrice, 0);
      }),
      liveCount: computed(() => livestreamService.livestreams$().length),
    }
  })
)

@Injectable({ providedIn: 'root' })
export class DashboardSignalStore extends dashboardStore { }