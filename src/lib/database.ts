/**
 * Legacy database exports for backwards compatibility
 * @deprecated Use specific modules instead:
 * - Database connection: './database-connection'
 * - Order operations: './orders'
 * - Data mapping: './mappers'
 */

// Re-export everything from the new modular structure
export * from './database-connection';
export * from './orders';
export * from './mappers';
export * from './business-rules';
