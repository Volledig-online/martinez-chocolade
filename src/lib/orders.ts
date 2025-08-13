/**
 * Order data access layer
 * Business logic for fetching and processing orders
 */

import { executeQuery, sql } from './database-connection';
import { mapDatabaseOrderToOrder } from './mappers';
import { DatabaseOrder, Order } from '@/types/order';

/**
 * Get all orders
 */
export async function getAllOrders(): Promise<Order[]> {
  return executeQuery(
    async dbPool => {
      const result = await dbPool
        .request()
        .query<DatabaseOrder>(
          'SELECT * FROM [dbo].[_AB_OrderRegel_View] ORDER BY [Leverdatum] ASC, [Ordernummer] ASC'
        );

      return result.recordset.map(mapDatabaseOrderToOrder);
    },
    2,
    'getAllOrders'
  );
}

/**
 * Get today's orders with business rule adjustments
 */
export async function getTodayOrders(): Promise<Order[]> {
  return executeQuery(
    async dbPool => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // We need to fetch orders from a wider date range to account for business rule adjustments
      // Orders up to 3 days in the future might belong to today after adjustment
      // Orders from the past might also belong to today (if they were originally scheduled for future dates)
      const threeDaysFromNow = new Date(today);
      threeDaysFromNow.setDate(today.getDate() + 3);

      // Start from a few days ago to catch orders that might have been adjusted backwards
      const threeDaysAgo = new Date(today);
      threeDaysAgo.setDate(today.getDate() - 3);

      const result = await dbPool
        .request()
        .input('startDate', sql.DateTime, threeDaysAgo)
        .input('endDate', sql.DateTime, threeDaysFromNow).query<DatabaseOrder>(`
        SELECT * FROM [dbo].[_AB_OrderRegel_View]
        WHERE [Leverdatum] >= @startDate AND [Leverdatum] < @endDate
        AND ([WMS_Status] = 'Sent to file')
        AND ([handTerminal] = null or [handTerminal] = '')
        ORDER BY [Ordernummer] ASC
      `);

      // Map to orders and filter for today based on adjusted dates
      const allOrders = result.recordset.map(mapDatabaseOrderToOrder);
      const todayOrders = allOrders.filter(order => {
        const orderDateString = order.orderDate.toDateString();
        const todayString = today.toDateString();

        // Include orders that are exactly today OR in the past (due to business rule adjustments)
        // Orders in the past should be shown in "today" table as they are overdue
        return orderDateString === todayString || order.orderDate <= today;
      });
      return todayOrders;
    },
    2,
    'getTodayOrders'
  );
}

/**
 * Get future orders with business rule adjustments
 */
export async function getFutureOrders(): Promise<Order[]> {
  return executeQuery(
    async dbPool => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      // Set end date to 3 weeks from today
      const threeWeeksFromToday = new Date(today);
      threeWeeksFromToday.setDate(today.getDate() + 21);

      // Fetch orders from today to 3 weeks ahead to account for business rule adjustments
      const result = await dbPool
        .request()
        .input('startDate', sql.DateTime, today)
        .input('endDate', sql.DateTime, threeWeeksFromToday)
        .query<DatabaseOrder>(`
        SELECT * FROM [dbo].[_AB_OrderRegel_View]
        WHERE [Leverdatum] >= @startDate AND [Leverdatum] <= @endDate
        AND ([WMS_Status] = 'Send to file')
        ORDER BY [Leverdatum] ASC, [Ordernummer] ASC
      `);

      // Map to orders and filter for future dates based on adjusted dates
      const allOrders = result.recordset.map(mapDatabaseOrderToOrder);
      return allOrders
        .filter(order => {
          return order.orderDate >= tomorrow;
        })
        .sort((a, b) => {
          if (a.orderDate < b.orderDate) return -1;
          if (a.orderDate > b.orderDate) return 1;
          return 0;
        });
    },
    2,
    'getFutureOrders'
  );
}

/**
 * Get orders by date range
 */
export async function getOrdersByDateRange(
  startDate: Date,
  endDate: Date
): Promise<Order[]> {
  return executeQuery(
    async dbPool => {
      const result = await dbPool
        .request()
        .input('startDate', sql.DateTime, startDate)
        .input('endDate', sql.DateTime, endDate).query<DatabaseOrder>(`
        SELECT * FROM [dbo].[_AB_OrderRegel_View]
        WHERE [Leverdatum] >= @startDate AND [Leverdatum] <= @endDate
        ORDER BY [Leverdatum] ASC, [Ordernummer] ASC
      `);

      return result.recordset.map(mapDatabaseOrderToOrder);
    },
    2,
    'getOrdersByDateRange'
  );
}

/**
 * Get count of orders with WMSStatus 'Read Back'
 */
export async function getReadBackOrdersCount(): Promise<number> {
  return executeQuery(
    async dbPool => {
      const result = await dbPool.request().query<{ count: number }>(`
        SELECT COUNT(*) as count FROM [dbo].[_AB_OrderRegel_View]
        WHERE [WMS_Status] = 'Read Back'
      `);

      return result.recordset[0]?.count || 0;
    },
    2,
    'getReadBackOrdersCount'
  );
}

/**
 * Get count of orders with WMSStatus 'Validated'
 */
export async function getValidatedOrdersCount(): Promise<number> {
  return executeQuery(
    async dbPool => {
      const result = await dbPool.request().query<{ count: number }>(`
        SELECT COUNT(*) as count FROM [dbo].[_AB_OrderRegel_View]
        WHERE [WMS_Status] = 'Validated'
      `);

      return result.recordset[0]?.count || 0;
    },
    2,
    'getValidatedOrdersCount'
  );
}
