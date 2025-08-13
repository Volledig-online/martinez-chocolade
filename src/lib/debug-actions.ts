'use server';

import { executeQuery } from './database-connection';
import { adjustOrderDateByLeveringswijze } from './business-rules';
import { DatabaseOrder } from '@/types/order';

export interface DebugStats {
  totalOrders: number;
  ordersWithMinus1Day: number;
  ordersWithMinus2Days: number;
  ordersInPast: number;
  ordersInTodayList: number;
  ordersInFutureList: number;
  ordersInTodayListByMinus1Day: number;
  ordersInTodayListByMinus2Days: number;
  ordersByLeveringswijze: Record<string, number>;
  ordersByMagazijncode: Record<string, number>;
  ordersByWmsStatus: Record<string, number>;
  ordersByOriginalDate: Record<string, number>;
  ordersByAdjustedDate: Record<string, number>;
  businessRuleAdjustments: {
    minus1Day: string[];
    minus2Days: string[];
    noAdjustment: string[];
  };
  allOrdersData: Array<{
    ordernummer: string;
    debiteurnaam: string;
    debiteurnummer: string;
    aantal: number;
    leveringswijze: string;
    route: string | null;
    magazijncode: string;
    wmsStatus: string;
    handTerminal: string | null;
    orderPicker: string | null;
    notitie: string | null;
    originalDate: string;
    adjustedDate: string;
    daysDifference: number;
    inTodayList: boolean;
    inFutureList: boolean;
  }>;
}

/**
 * Get comprehensive debug statistics about order processing
 */
export async function getDebugStats(): Promise<DebugStats> {
  return executeQuery(async dbPool => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get all orders with New or empty WMS_Status
    const result = await dbPool.request().query<DatabaseOrder>(`
        SELECT * FROM [dbo].[_AB_OrderRegel_View]
        ORDER BY [Leverdatum] ASC, [Ordernummer] ASC
      `);

    const allDatabaseOrders = result.recordset;
    const totalOrders = allDatabaseOrders.length;

    // Initialize counters
    let ordersWithMinus1Day = 0;
    let ordersWithMinus2Days = 0;
    let ordersInPast = 0;
    let ordersInTodayList = 0;
    let ordersInFutureList = 0;
    let ordersInTodayListByMinus1Day = 0;
    let ordersInTodayListByMinus2Days = 0;

    const ordersByLeveringswijze: Record<string, number> = {};
    const ordersByMagazijncode: Record<string, number> = {};
    const ordersByWmsStatus: Record<string, number> = {};
    const ordersByOriginalDate: Record<string, number> = {};
    const ordersByAdjustedDate: Record<string, number> = {};

    const businessRuleAdjustments = {
      minus1Day: [] as string[],
      minus2Days: [] as string[],
      noAdjustment: [] as string[],
    };

    const allOrdersData: DebugStats['allOrdersData'] = [];

    // Process each order
    for (const dbOrder of allDatabaseOrders) {
      const originalDate = new Date(dbOrder.Leverdatum);
      const adjustedDate = adjustOrderDateByLeveringswijze(
        originalDate,
        dbOrder.Leverwijze
      );

      // Count by leveringswijze
      const leveringswijze = dbOrder.Leverwijze?.trim() || 'Unknown';
      ordersByLeveringswijze[leveringswijze] =
        (ordersByLeveringswijze[leveringswijze] || 0) + 1;

      // Count by magazijncode
      const magazijncode = dbOrder.Magazijncode?.trim() || 'Unknown';
      ordersByMagazijncode[magazijncode] =
        (ordersByMagazijncode[magazijncode] || 0) + 1;

      // Count by WMS status
      const wmsStatus = dbOrder.WMS_Status?.trim() || 'Empty';
      ordersByWmsStatus[wmsStatus] = (ordersByWmsStatus[wmsStatus] || 0) + 1;

      // Count by original date
      const originalDateString = originalDate.toDateString();
      ordersByOriginalDate[originalDateString] =
        (ordersByOriginalDate[originalDateString] || 0) + 1;

      // Count by adjusted date
      const adjustedDateString = adjustedDate.toDateString();
      ordersByAdjustedDate[adjustedDateString] =
        (ordersByAdjustedDate[adjustedDateString] || 0) + 1;

      // Check business rule adjustments
      const daysDifference = Math.round(
        (originalDate.getTime() - adjustedDate.getTime()) /
          (1000 * 60 * 60 * 24)
      );

      if (daysDifference === 1) {
        ordersWithMinus1Day++;
        businessRuleAdjustments.minus1Day.push(leveringswijze);
      } else if (daysDifference === 2) {
        ordersWithMinus2Days++;
        businessRuleAdjustments.minus2Days.push(leveringswijze);
      } else {
        businessRuleAdjustments.noAdjustment.push(leveringswijze);
      }

      // Check if order is in the past after adjustment
      if (adjustedDate < today) {
        ordersInPast++;
      }

      // Determine if order would be in today or future list
      const orderDateString = adjustedDate.toDateString();
      const todayString = today.toDateString();

      let inTodayList = false;
      let inFutureList = false;

      if (orderDateString === todayString || adjustedDate <= today) {
        ordersInTodayList++;
        inTodayList = true;

        // Check if this order is in today list because of business rules
        if (daysDifference === 1) {
          ordersInTodayListByMinus1Day++;
        } else if (daysDifference === 2) {
          ordersInTodayListByMinus2Days++;
        }
      } else {
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        if (adjustedDate >= tomorrow) {
          ordersInFutureList++;
          inFutureList = true;
        }
      }

      // Add order data to the detailed array
      allOrdersData.push({
        ordernummer: dbOrder.Ordernummer,
        debiteurnaam: dbOrder.Debiteurnaam,
        debiteurnummer: dbOrder.Debiteurnummer,
        aantal: dbOrder.Aantal,
        leveringswijze: leveringswijze,
        route: dbOrder.Route,
        magazijncode: magazijncode,
        wmsStatus: dbOrder.WMS_Status?.trim() || 'Empty',
        handTerminal: dbOrder.HandTerminal,
        orderPicker: dbOrder.OrderPicker,
        notitie: dbOrder.Notitie,
        originalDate: originalDate.toLocaleDateString('nl-NL'),
        adjustedDate: adjustedDate.toLocaleDateString('nl-NL'),
        daysDifference: daysDifference,
        inTodayList: inTodayList,
        inFutureList: inFutureList,
      });
    }

    return {
      totalOrders,
      ordersWithMinus1Day,
      ordersWithMinus2Days,
      ordersInPast,
      ordersInTodayList,
      ordersInFutureList,
      ordersInTodayListByMinus1Day,
      ordersInTodayListByMinus2Days,
      ordersByLeveringswijze,
      ordersByMagazijncode,
      ordersByWmsStatus,
      ordersByOriginalDate,
      ordersByAdjustedDate,
      businessRuleAdjustments,
      allOrdersData,
    };
  });
}
