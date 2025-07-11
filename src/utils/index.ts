/**
 * Utility functions index file
 * Re-exports all utility functions for easy importing
 */

// Date utilities
export {
  isToday,
  isFuture,
  formatOrderDate,
  createDateHelpers,
} from './date';

// Business logic utilities
export {
  getDeliveryIconFromLeveringswijze,
  getStatusIconFromRoute,
} from './business-logic';

// Order filtering utilities
export {
  getTodayOrders,
  getFutureOrders,
} from './order-filters';

// API utilities
export {
  fetchOrders,
  fetchOrdersVandaag,
  fetchOrdersToekomst,
} from './api';
