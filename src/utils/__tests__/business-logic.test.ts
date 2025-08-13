/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Tests for business logic utility functions
 */

import {
  getDeliveryIconFromLeveringswijze,
  getStatusIconFromRoute,
} from '../business-logic';
import type { Leveringswijze } from '../../types';

describe('getDeliveryIconFromLeveringswijze', () => {
  describe('delivery-man icon (afhalen codes)', () => {
    const afhalenCodes: Leveringswijze[] = ['10', '60', '70', 'EXW'];

    test.each(afhalenCodes)(
      'should return "delivery-man" for leveringswijze "%s"',
      code => {
        const result = getDeliveryIconFromLeveringswijze(code);
        expect(result).toBe('delivery-man');
      }
    );
  });

  describe('bus icon (transport codes)', () => {
    const transportCodes: Leveringswijze[] = [
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

    test.each(transportCodes)(
      'should return "bus" for leveringswijze "%s"',
      code => {
        const result = getDeliveryIconFromLeveringswijze(code);
        expect(result).toBe('bus');
      }
    );
  });

  describe('specific test cases', () => {
    test('should return "delivery-man" for leveringswijze "10"', () => {
      const result = getDeliveryIconFromLeveringswijze('10');
      expect(result).toBe('delivery-man');
    });

    test('should return "bus" for leveringswijze "32"', () => {
      const result = getDeliveryIconFromLeveringswijze('32');
      expect(result).toBe('bus');
    });

    test('should return "delivery-man" for leveringswijze "EXW"', () => {
      const result = getDeliveryIconFromLeveringswijze('EXW');
      expect(result).toBe('delivery-man');
    });

    test('should return "bus" for leveringswijze "CIF"', () => {
      const result = getDeliveryIconFromLeveringswijze('CIF');
      expect(result).toBe('bus');
    });
  });

  describe('whitespace handling', () => {
    test('should return "delivery-man" for leveringswijze "10   " (with trailing spaces)', () => {
      const result = getDeliveryIconFromLeveringswijze('10   ' as any);
      expect(result).toBe('delivery-man');
    });

    test('should return "delivery-man" for leveringswijze "   10" (with leading spaces)', () => {
      const result = getDeliveryIconFromLeveringswijze('   10' as any);
      expect(result).toBe('delivery-man');
    });

    test('should return "delivery-man" for leveringswijze "  10  " (with both leading and trailing spaces)', () => {
      const result = getDeliveryIconFromLeveringswijze('  10  ' as any);
      expect(result).toBe('delivery-man');
    });

    test('should return "bus" for leveringswijze "32   " (with trailing spaces)', () => {
      const result = getDeliveryIconFromLeveringswijze('32   ' as any);
      expect(result).toBe('bus');
    });

    test('should return "delivery-man" for leveringswijze "EXW   " (with trailing spaces)', () => {
      const result = getDeliveryIconFromLeveringswijze('EXW   ' as any);
      expect(result).toBe('delivery-man');
    });
  });
});

describe('getStatusIconFromRoute', () => {
  test('should return "pallet-full" for route "PA"', () => {
    const result = getStatusIconFromRoute('PA');
    expect(result).toBe('pallet-full');
  });

  test('should return "trolley" for route "KA"', () => {
    const result = getStatusIconFromRoute('KA');
    expect(result).toBe('trolley');
  });

  test('should return "pallet-half" for route "MP"', () => {
    const result = getStatusIconFromRoute('MP');
    expect(result).toBe('pallet-half');
  });

  test('should return "pallet-full" as default for null route', () => {
    const result = getStatusIconFromRoute(null as any);
    expect(result).toBe('pallet-full');
  });
});
