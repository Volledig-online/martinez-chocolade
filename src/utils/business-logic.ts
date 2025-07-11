/**
 * Business logic utility functions for order management
 */

import type { Leveringswijze, Route } from '../data/orders';

/**
 * Get delivery icon based on leveringswijze
 * Afhalen = delivery-man: 10, 60, 70, EXW
 * Transport = bus: 32, 100, CIF, 90, CPT, DAP, DDP, FCA, 50
 */
export const getDeliveryIconFromLeveringswijze = (
  leveringswijze: Leveringswijze
): 'bus' | 'delivery-man' => {
  // Afhalen = delivery-man: 10, 60, 70, EXW
  const afhalenCodes: Leveringswijze[] = ['10', '60', '70', 'EXW'];

  if (afhalenCodes.includes(leveringswijze)) {
    return 'delivery-man';
  }

  // Transport = bus: 32, 100, CIF, 90, CPT, DAP, DDP, FCA, 50
  return 'bus';
};

/**
 * Get status icon based on route
 * PA = Pallet (pallet-full icon)
 * KA = Kar (trolley icon)
 * MP = Minipallet (pallet-half icon)
 */
export const getStatusIconFromRoute = (
  route: Route
): 'pallet-full' | 'pallet-half' | 'trolley' => {
  switch (route) {
    case 'PA': // Pallet (icoontje pallet met 2 dozen)
      return 'pallet-full';
    case 'KA': // Kar (icoontje steekwagen)
      return 'trolley';
    case 'MP': // Minipallet (icoontje pallet met 1 doos)
      return 'pallet-half';
    default:
      return 'pallet-full';
  }
};
