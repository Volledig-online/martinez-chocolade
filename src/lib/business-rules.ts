/**
 * Business rules and utilities
 * Pure business logic functions without dependencies
 */

/**
 * Adjust order date based on leveringswijze business rules
 * - Codes 10, 60, 70, EXW: subtract 1 business day (skip weekends)
 * - Codes 32, 100, CIF, 90, CPT, DAP, DDP, FCA, 50: subtract 2 business days (skip weekends)
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

  // Helper to subtract N business days (Mon-Fri), skipping Sat/Sun
  const subtractBusinessDays = (date: Date, days: number) => {
    let remaining = days;
    while (remaining > 0) {
      date.setDate(date.getDate() - 1);
      const day = date.getDay(); // 0=Sun, 6=Sat
      if (day !== 0 && day !== 6) {
        remaining -= 1;
      }
    }
  };

  if (oneDayCodes.includes(code)) {
    subtractBusinessDays(adjustedDate, 1);
  } else if (twoDayCodes.includes(code)) {
    subtractBusinessDays(adjustedDate, 2);
  }

  return adjustedDate;
}
