/**
 * Utility functions index file
 * Re-exports all utility functions for easy importing
 */

// Date utilities
export { isToday, isFuture, formatOrderDate, createDateHelpers } from './date';

// Business logic utilities
export {
  getDeliveryIconFromLeveringswijze,
  getStatusIconFromRoute,
} from './business-logic';
