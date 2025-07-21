'use server';

import {
  getTodayOrders,
  getFutureOrders,
  getReadBackOrdersCount,
  getValidatedOrdersCount,
} from '@/lib/orders';
import type { Order } from '@/types';

export interface DashboardData {
  todayOrders: Order[];
  futureOrders: Order[];
  readBackCount: number;
  validatedCount: number;
}

/**
 * Server action to fetch all dashboard data
 */
export async function fetchDashboardData(): Promise<DashboardData> {
  try {
    // Fetch all data in parallel
    const [todayOrders, futureOrders, readBackCount, validatedCount] =
      await Promise.all([
        getTodayOrders(),
        getFutureOrders(),
        getReadBackOrdersCount(),
        getValidatedOrdersCount(),
      ]);

    return {
      todayOrders,
      futureOrders,
      readBackCount,
      validatedCount,
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw new Error('Failed to fetch dashboard data');
  }
}

/**
 * Server action to fetch only today's orders
 */
export async function fetchTodayOrders(): Promise<Order[]> {
  try {
    return await getTodayOrders();
  } catch (error) {
    console.error('Error fetching today orders:', error);
    throw new Error('Failed to fetch today orders');
  }
}

/**
 * Server action to fetch only future orders
 */
export async function fetchFutureOrders(): Promise<Order[]> {
  try {
    return await getFutureOrders();
  } catch (error) {
    console.error('Error fetching future orders:', error);
    throw new Error('Failed to fetch future orders');
  }
}

/**
 * Server action to fetch order counts
 */
export async function fetchOrderCounts(): Promise<{
  readBackCount: number;
  validatedCount: number;
}> {
  try {
    const [readBackCount, validatedCount] = await Promise.all([
      getReadBackOrdersCount(),
      getValidatedOrdersCount(),
    ]);

    return {
      readBackCount,
      validatedCount,
    };
  } catch (error) {
    console.error('Error fetching order counts:', error);
    throw new Error('Failed to fetch order counts');
  }
}
