/**
 * Data mapping utilities
 * Convert between database and application data formats
 */

import {
  DatabaseOrder,
  Order,
  Leveringswijze,
  Route,
  WMSStatus,
} from '@/types/order';
import { adjustOrderDateByLeveringswijze } from './business-rules';

/**
 * Convert database order to application order
 */
export function mapDatabaseOrderToOrder(dbOrder: DatabaseOrder): Order {
  // Apply business rule: adjust order date based on leveringswijze
  const originalDate = new Date(dbOrder.Leverdatum);
  const adjustedDate = adjustOrderDateByLeveringswijze(
    originalDate,
    dbOrder.Leverwijze
  );

  return {
    id: dbOrder.Ordernummer,
    name: dbOrder.Debiteurnaam,
    quantity: dbOrder.Aantal,
    leveringswijze: dbOrder.Leverwijze as Leveringswijze,
    route: dbOrder.Route as Route,
    orderDate: adjustedDate,
    customerNumber: dbOrder.Debiteurnummer,
    notes: dbOrder.Notitie,
    warehouseCode: dbOrder.Magazijncode,
    wmsStatus: dbOrder.WMS_Status as WMSStatus,
    handTerminal: dbOrder.HandTerminal,
    orderPicker: dbOrder.OrderPicker,
  };
}
