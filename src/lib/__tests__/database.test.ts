/**
 * Tests for database business rules
 */

import { adjustOrderDateByLeveringswijze } from '../business-rules';

describe('adjustOrderDateByLeveringswijze', () => {
  const baseDate = new Date('2025-07-22T10:00:00.000Z'); // Monday, July 22, 2025

  describe('1-day subtraction codes (10, 60, 70, EXW)', () => {
    const oneDayCodes = ['10', '60', '70', 'EXW'];

    test.each(oneDayCodes)('should subtract 1 day for code "%s"', code => {
      const result = adjustOrderDateByLeveringswijze(baseDate, code);
      const expected = new Date('2025-07-21T10:00:00.000Z'); // Sunday, July 21, 2025

      expect(result).toEqual(expected);
      expect(result.getTime()).toBe(expected.getTime());
    });

    test('should handle code "10" with trailing spaces', () => {
      const result = adjustOrderDateByLeveringswijze(baseDate, '10   ');
      const expected = new Date('2025-07-21T10:00:00.000Z');

      expect(result).toEqual(expected);
    });

    test('should handle code "EXW" with leading spaces', () => {
      const result = adjustOrderDateByLeveringswijze(baseDate, '  EXW');
      const expected = new Date('2025-07-21T10:00:00.000Z');

      expect(result).toEqual(expected);
    });
  });

  describe('2-day subtraction codes (32, 100, CIF, 90, CPT, DAP, DDP, FCA, 50)', () => {
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

    test.each(twoDayCodes)('should subtract 2 days for code "%s"', code => {
      const result = adjustOrderDateByLeveringswijze(baseDate, code);
      const expected = new Date('2025-07-18T10:00:00.000Z'); // Friday, July 18, 2025 (weekend rollback)

      expect(result).toEqual(expected);
      expect(result.getTime()).toBe(expected.getTime());
    });

    test('should handle code "100" with trailing spaces', () => {
      const result = adjustOrderDateByLeveringswijze(baseDate, '100  ');
      const expected = new Date('2025-07-18T10:00:00.000Z');

      expect(result).toEqual(expected);
    });

    test('should handle code "CIF" with mixed spaces', () => {
      const result = adjustOrderDateByLeveringswijze(baseDate, ' CIF ');
      const expected = new Date('2025-07-18T10:00:00.000Z');

      expect(result).toEqual(expected);
    });
  });

  describe('Unknown codes (no adjustment)', () => {
    const unknownCodes = ['99', 'UNKNOWN', 'ABC', '', '   '];

    test.each(unknownCodes)(
      'should not adjust date for unknown code "%s"',
      code => {
        const result = adjustOrderDateByLeveringswijze(baseDate, code);

        expect(result).toEqual(baseDate);
        expect(result.getTime()).toBe(baseDate.getTime());
      }
    );
  });

  describe('Edge cases', () => {
    test('should handle month boundary correctly (1-day subtraction)', () => {
      const firstOfMonth = new Date('2025-08-01T10:00:00.000Z'); // August 1st
      const result = adjustOrderDateByLeveringswijze(firstOfMonth, '10');
      const expected = new Date('2025-07-31T10:00:00.000Z'); // July 31st

      expect(result).toEqual(expected);
    });

    test('should handle month boundary correctly (2-day subtraction)', () => {
      const secondOfMonth = new Date('2025-08-02T10:00:00.000Z'); // August 2nd
      const result = adjustOrderDateByLeveringswijze(secondOfMonth, '100');
      const expected = new Date('2025-07-31T10:00:00.000Z'); // July 31st

      expect(result).toEqual(expected);
    });

    test('should handle year boundary correctly', () => {
      const newYear = new Date('2026-01-01T10:00:00.000Z'); // January 1st, 2026
      const result = adjustOrderDateByLeveringswijze(newYear, '100');
      const expected = new Date('2025-12-30T10:00:00.000Z'); // December 30th, 2025

      expect(result).toEqual(expected);
    });

    test('should handle leap year correctly', () => {
      const leapYearMarch = new Date('2024-03-01T10:00:00.000Z'); // March 1st, 2024 (leap year)
      const result = adjustOrderDateByLeveringswijze(leapYearMarch, '100');
      const expected = new Date('2024-02-28T10:00:00.000Z'); // February 28th, 2024

      expect(result).toEqual(expected);
    });

    test('should preserve time components', () => {
      const dateWithTime = new Date('2025-07-22T14:30:45.123Z');
      const result = adjustOrderDateByLeveringswijze(dateWithTime, '10');
      const expected = new Date('2025-07-21T14:30:45.123Z');

      expect(result).toEqual(expected);
      expect(result.getHours()).toBe(expected.getHours());
      expect(result.getMinutes()).toBe(expected.getMinutes());
      expect(result.getSeconds()).toBe(expected.getSeconds());
      expect(result.getMilliseconds()).toBe(expected.getMilliseconds());
    });

    test('should not modify the original date object', () => {
      const originalDate = new Date('2025-07-22T10:00:00.000Z');
      const originalTime = originalDate.getTime();

      adjustOrderDateByLeveringswijze(originalDate, '10');

      expect(originalDate.getTime()).toBe(originalTime);
    });
  });

  describe('Case sensitivity', () => {
    test('should handle lowercase codes', () => {
      const result = adjustOrderDateByLeveringswijze(baseDate, 'exw');
      // Should not match because our implementation is case-sensitive
      expect(result).toEqual(baseDate);
    });

    test('should handle mixed case codes', () => {
      const result = adjustOrderDateByLeveringswijze(baseDate, 'Exw');
      // Should not match because our implementation is case-sensitive
      expect(result).toEqual(baseDate);
    });

    test('should match exact case for string codes', () => {
      const result = adjustOrderDateByLeveringswijze(baseDate, 'EXW');
      const expected = new Date('2025-07-21T10:00:00.000Z');

      expect(result).toEqual(expected);
    });
  });

  describe('Performance and consistency', () => {
    test('should return consistent results for multiple calls', () => {
      const testDate = new Date('2025-07-22T10:00:00.000Z');

      const result1 = adjustOrderDateByLeveringswijze(testDate, '10');
      const result2 = adjustOrderDateByLeveringswijze(testDate, '10');
      const result3 = adjustOrderDateByLeveringswijze(testDate, '10');

      expect(result1).toEqual(result2);
      expect(result2).toEqual(result3);
      expect(result1.getTime()).toBe(result2.getTime());
    });

    test('should handle large date values', () => {
      const futureDate = new Date('2099-12-31T23:59:59.999Z');
      const result = adjustOrderDateByLeveringswijze(futureDate, '100');
      const expected = new Date('2099-12-29T23:59:59.999Z');

      expect(result).toEqual(expected);
    });
  });

  describe('Business rule integration scenarios', () => {
    test('should correctly categorize orders that move from future to today', () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Create a date that is tomorrow in the database
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      // But with leveringswijze "10" (1-day subtraction), it should become today
      const adjustedDate = adjustOrderDateByLeveringswijze(tomorrow, '10');

      expect(adjustedDate.toDateString()).toBe(today.toDateString());
    });

    test('should correctly categorize orders that move from future to today with 2-day adjustment', () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Create a date that is day after tomorrow in the database
      const dayAfterTomorrow = new Date(today);
      dayAfterTomorrow.setDate(today.getDate() + 2);

      // But with leveringswijze "100" (2-day subtraction), it should become today
      const adjustedDate = adjustOrderDateByLeveringswijze(
        dayAfterTomorrow,
        '100'
      );

      expect(adjustedDate.toDateString()).toBe(today.toDateString());
    });

    test('should correctly categorize orders that move from future to yesterday', () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);

      // Create a date that is tomorrow in the database
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      // But with leveringswijze "100" (2-day subtraction), it should become yesterday
      const adjustedDate = adjustOrderDateByLeveringswijze(tomorrow, '100');

      expect(adjustedDate.toDateString()).toBe(yesterday.toDateString());
    });

    test('should handle orders that appear in the past but belong to today', () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Scenario: An order was originally scheduled for today in the database
      // but due to business rules, it should still be today
      // This tests that we don't lose orders that are already correctly dated
      const adjustedDate = adjustOrderDateByLeveringswijze(today, 'UNKNOWN');

      expect(adjustedDate.toDateString()).toBe(today.toDateString());
    });
  });
});
