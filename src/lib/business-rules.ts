/**
 * Business rules and utilities
 * Pure business logic functions without dependencies
 */

/**
 * Adjust order date based on leveringswijze business rules
 * - Codes 10, 60, 70, EXW: subtract 1 day
 * - Codes 32, 100, CIF, 90, CPT, DAP, DDP, FCA, 50: subtract 2 days
 * - Other codes: no adjustment
 */
export function adjustOrderDateByLeveringswijze(
  orderDate: Date,
  leveringswijze: string
): Date {
  // Create a new date object to avoid modifying the original
  const adjustedDate = new Date(orderDate.getTime());

  // Trim whitespace and check for specific codes
  const code = leveringswijze.trim();

  // 1-day subtraction codes
  const oneDayCodes = ['10', '60', '70', 'EXW'];
  // 2-day subtraction codes
  const twoDayCodes = [
    '32',
    '100',
    'CIF',
    '90',
    'CPT',
    'DAP',
    'DDP',
    'FCA',
    '50',
  ];

  // Apply base adjustment by leveringswijze
  let didAdjust = false;
  if (oneDayCodes.includes(code)) {
    adjustedDate.setDate(adjustedDate.getDate() - 1);
    didAdjust = true;
  } else if (twoDayCodes.includes(code)) {
    adjustedDate.setDate(adjustedDate.getDate() - 2);
    didAdjust = true;
  }

  // If we adjusted and the resulting date falls on a weekend, roll back to Friday
  // getDay(): 0 = Sunday, 6 = Saturday
  if (didAdjust) {
    const day = adjustedDate.getDay();
    if (day === 6) {
      // Saturday -> move back 1 day to Friday
      adjustedDate.setDate(adjustedDate.getDate() - 1);
    } else if (day === 0) {
      // Sunday -> move back 2 days to Friday
      adjustedDate.setDate(adjustedDate.getDate() - 2);
    }
  }

  return adjustedDate;
}
