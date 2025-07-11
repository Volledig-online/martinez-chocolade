/**
 * API utility functions for order management
 */

import type { Order } from '../data/orders';
import { ordersData } from '../data/orders';
import { getTodayOrders, getFutureOrders } from './order-filters';

/**
 * Simulate API delay
 */
const simulateApiDelay = (ms: number = 500): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Fetch all orders (simulated API call)
 */
export const fetchOrders = async (): Promise<Order[]> => {
  await simulateApiDelay();
  return ordersData;
};

/**
 * Fetch today's orders (simulated API call)
 */
export const fetchOrdersVandaag = async (): Promise<Order[]> => {
  await simulateApiDelay();
  return getTodayOrders(ordersData);
};

/**
 * Fetch future orders (simulated API call)
 */
export const fetchOrdersToekomst = async (): Promise<Order[]> => {
  await simulateApiDelay();
  return getFutureOrders(ordersData);
};
