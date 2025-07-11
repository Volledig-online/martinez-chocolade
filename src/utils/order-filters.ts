/**
 * Order filtering utility functions
 */

import type { Order } from '../data/orders';
import { isToday, isFuture } from './date';

/**
 * Filter orders for today
 */
export const getTodayOrders = (orders: Order[]): Order[] => {
  return orders.filter(order => isToday(order.orderDate));
};

/**
 * Filter orders for future dates
 */
export const getFutureOrders = (orders: Order[]): Order[] => {
  return orders.filter(order => isFuture(order.orderDate));
};
