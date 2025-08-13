/**
 * Database connection utilities
 * Pure database connectivity without business logic
 */

import sql from 'mssql';

// Database configuration
const config: sql.config = {
  server: process.env.DATABASE_SQL_URL || '',
  user: process.env.DATABASE_SQL_USER || '',
  password: process.env.DATABASE_SQL_PASSWORD || '',
  database: process.env.DATABASE_SQL_DATABASE || '200',
  options: {
    encrypt: false,
    trustServerCertificate: true,
    enableArithAbort: true,
    connectTimeout: 30000,
    requestTimeout: 30000,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

/**
 * Create a fresh database connection for each query
 * This avoids connection pooling issues with SQL Server
 */
async function createConnection(): Promise<sql.ConnectionPool> {
  const connection = new sql.ConnectionPool(config);
  await connection.connect();
  return connection;
}

/**
 * Execute a database query with retry logic and fresh connections
 */
export async function executeQuery<T>(
  queryFn: (pool: sql.ConnectionPool) => Promise<T>,
  retries = 2,
  debugLabel?: string
): Promise<T> {
  let lastError: Error;

  for (let attempt = 0; attempt <= retries; attempt++) {
    let connection: sql.ConnectionPool | null = null;

    try {
      connection = await createConnection();
      const result = await queryFn(connection);

      // Debug logging for order queries
      if (debugLabel && process.env.NODE_ENV === 'development') {
        console.log(`[DEBUG] ${debugLabel}:`, {
          timestamp: new Date().toISOString(),
          resultCount: Array.isArray(result) ? result.length : 'N/A',
          attempt: attempt + 1,
        });

        // Log order statuses if result contains orders
        if (
          Array.isArray(result) &&
          result.length > 0 &&
          'wmsStatus' in result[0]
        ) {
          const statusCounts = result.reduce(
            (acc: Record<string, number>, order: { wmsStatus?: string }) => {
              const status = order.wmsStatus || 'Empty';
              acc[status] = (acc[status] || 0) + 1;
              return acc;
            },
            {}
          );
          console.log(
            `[DEBUG] ${debugLabel} - Status breakdown:`,
            statusCounts
          );
        }
      }

      await connection.close();
      return result;
    } catch (error) {
      lastError = error as Error;
      console.error(`Database query attempt ${attempt + 1} failed:`, error);

      // Clean up connection on error
      if (connection) {
        try {
          await connection.close();
        } catch (closeError) {
          console.error('Error closing connection:', closeError);
        }
      }

      // Don't retry on the last attempt
      if (attempt === retries) {
        break;
      }

      // Wait a bit before retrying
      await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
    }
  }

  throw lastError!;
}

/**
 * Test database connection
 */
export async function testConnection(): Promise<boolean> {
  return executeQuery(async dbPool => {
    await dbPool.request().query('SELECT 1 as test');
    return true;
  }).catch(error => {
    console.error('Database connection test failed:', error);
    return false;
  });
}

/**
 * Export sql for type definitions
 */
export { sql };
