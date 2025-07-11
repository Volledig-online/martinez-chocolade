import { createDateHelpers } from '../utils';
import { getTodayOrders, getFutureOrders } from '../utils/order-filters';

// Business logic types
export type Leveringswijze =
  | '10'
  | '60'
  | '70'
  | 'EXW'
  | '32'
  | '100'
  | 'CIF'
  | '90'
  | 'CPT'
  | 'DAP'
  | 'DDP'
  | 'FCA'
  | '50';
export type Route = 'PA' | 'KA' | 'MP';

export interface Order {
  id: string;
  name: string;
  quantity: number;
  leveringswijze: Leveringswijze;
  route: Route;
  orderDate: Date;
}

// Helper function to create dates
const { today, tomorrow, dayAfterTomorrow, nextWeek } = createDateHelpers();

// Combined orders dataset with dates
export const ordersData: Order[] = [
  // Today's orders
  {
    id: '83648',
    name: 'Chocolaterie Amsterdam De Pijp',
    quantity: 12,
    leveringswijze: '32',
    route: 'PA',
    orderDate: new Date(today),
  },
  {
    id: '15973',
    name: 'Chocolaterie Amsterdam De Pijp',
    quantity: 17,
    leveringswijze: '100',
    route: 'PA',
    orderDate: new Date(today),
  },
  {
    id: '94712',
    name: 'Chocolaterie Amsterdam De Pijp',
    quantity: 1,
    leveringswijze: 'DDP',
    route: 'PA',
    orderDate: new Date(today),
  },
  {
    id: '56239',
    name: 'Van Ekris Chocola',
    quantity: 1,
    leveringswijze: '10',
    route: 'KA',
    orderDate: new Date(today),
  },
  {
    id: '38476',
    name: 'Van Ekris Chocola',
    quantity: 10,
    leveringswijze: '60',
    route: 'KA',
    orderDate: new Date(today),
  },
  {
    id: '24689',
    name: 'Van Ekris Chocola',
    quantity: 8,
    leveringswijze: 'EXW',
    route: 'KA',
    orderDate: new Date(today),
  },
  {
    id: '11234',
    name: 'Van Ekris Chocola',
    quantity: 3,
    leveringswijze: '70',
    route: 'KA',
    orderDate: new Date(today),
  },
  {
    id: '71824',
    name: 'Van Ekris Chocola',
    quantity: 3,
    leveringswijze: '10',
    route: 'KA',
    orderDate: new Date(today),
  },

  // Tomorrow's orders
  {
    id: '11235',
    name: 'Van Ekris Chocola',
    quantity: 3,
    leveringswijze: '60',
    route: 'KA',
    orderDate: new Date(tomorrow),
  },
  {
    id: '99001',
    name: 'Bakkerij De Vrolijke Taart',
    quantity: 5,
    leveringswijze: 'CIF',
    route: 'MP',
    orderDate: new Date(tomorrow),
  },
  {
    id: '99002',
    name: 'Café Central Amsterdam',
    quantity: 2,
    leveringswijze: 'EXW',
    route: 'KA',
    orderDate: new Date(tomorrow),
  },
  {
    id: '99003',
    name: 'Restaurant De Gouden Lepel',
    quantity: 15,
    leveringswijze: 'DAP',
    route: 'PA',
    orderDate: new Date(tomorrow),
  },
  {
    id: '99004',
    name: 'Ijssalon Bella Vista',
    quantity: 7,
    leveringswijze: '70',
    route: 'KA',
    orderDate: new Date(tomorrow),
  },

  // Day after tomorrow's orders
  {
    id: '99005',
    name: 'Hotel Grand Plaza',
    quantity: 25,
    leveringswijze: '50',
    route: 'PA',
    orderDate: new Date(dayAfterTomorrow),
  },
  {
    id: '99006',
    name: 'Patisserie La Belle Époque',
    quantity: 8,
    leveringswijze: 'CPT',
    route: 'MP',
    orderDate: new Date(dayAfterTomorrow),
  },
  {
    id: '99007',
    name: 'Chocolaterie Artisanale',
    quantity: 4,
    leveringswijze: '10',
    route: 'KA',
    orderDate: new Date(dayAfterTomorrow),
  },
  {
    id: '99008',
    name: 'Brasserie De Gouden Leeuw',
    quantity: 20,
    leveringswijze: 'FCA',
    route: 'PA',
    orderDate: new Date(dayAfterTomorrow),
  },
  {
    id: '99009',
    name: 'Tearoom Victoria',
    quantity: 6,
    leveringswijze: '60',
    route: 'KA',
    orderDate: new Date(dayAfterTomorrow),
  },

  // Next week's orders
  {
    id: '99010',
    name: 'Confiserie Van Der Berg',
    quantity: 12,
    leveringswijze: '90',
    route: 'MP',
    orderDate: new Date(nextWeek),
  },
  {
    id: '99011',
    name: 'Café De Oude Markt',
    quantity: 3,
    leveringswijze: 'EXW',
    route: 'KA',
    orderDate: new Date(nextWeek),
  },
  {
    id: '99012',
    name: 'Restaurant Chez Pierre',
    quantity: 18,
    leveringswijze: 'DDP',
    route: 'PA',
    orderDate: new Date(nextWeek),
  },
  {
    id: '99013',
    name: 'Lunchroom De Zonnebloem',
    quantity: 9,
    leveringswijze: '70',
    route: 'KA',
    orderDate: new Date(nextWeek),
  },
  {
    id: '99014',
    name: 'Hotel De Kroon',
    quantity: 30,
    leveringswijze: '32',
    route: 'PA',
    orderDate: new Date(nextWeek),
  },
  {
    id: '99015',
    name: 'Chocolaterie Bonbon',
    quantity: 5,
    leveringswijze: '10',
    route: 'KA',
    orderDate: new Date(nextWeek),
  },
  {
    id: '99016',
    name: 'Bistro Le Jardin',
    quantity: 14,
    leveringswijze: 'CIF',
    route: 'MP',
    orderDate: new Date(nextWeek),
  },
  {
    id: '99017',
    name: 'Koffiehuis De Beurs',
    quantity: 7,
    leveringswijze: '60',
    route: 'KA',
    orderDate: new Date(nextWeek),
  },
  {
    id: '99018',
    name: 'Grand Café Amsterdam',
    quantity: 22,
    leveringswijze: '100',
    route: 'PA',
    orderDate: new Date(nextWeek),
  },
  {
    id: '99019',
    name: 'Patisserie Royale',
    quantity: 11,
    leveringswijze: 'DAP',
    route: 'MP',
    orderDate: new Date(nextWeek),
  },
  {
    id: '99020',
    name: 'Chocolaterie De Gouden Cacao',
    quantity: 16,
    leveringswijze: '70',
    route: 'KA',
    orderDate: new Date(nextWeek),
  },
  {
    id: '99021',
    name: 'Restaurant De Zilveren Lepel',
    quantity: 13,
    leveringswijze: 'CIF',
    route: 'PA',
    orderDate: new Date(nextWeek),
  },
  {
    id: '99022',
    name: 'Café De Blauwe Druif',
    quantity: 4,
    leveringswijze: 'EXW',
    route: 'KA',
    orderDate: new Date(nextWeek),
  },
  {
    id: '99023',
    name: 'Hotel Boutique Amsterdam',
    quantity: 28,
    leveringswijze: '50',
    route: 'PA',
    orderDate: new Date(nextWeek),
  },
  {
    id: '99024',
    name: 'Patisserie Van Houten',
    quantity: 9,
    leveringswijze: '10',
    route: 'MP',
    orderDate: new Date(nextWeek),
  },
  {
    id: '99025',
    name: 'Brasserie De Gouden Kroon',
    quantity: 19,
    leveringswijze: 'DAP',
    route: 'PA',
    orderDate: new Date(nextWeek),
  },
  {
    id: '99026',
    name: 'Chocolaterie Praline',
    quantity: 6,
    leveringswijze: '60',
    route: 'KA',
    orderDate: new Date(nextWeek),
  },
  {
    id: '99027',
    name: 'Grand Hotel Europa',
    quantity: 35,
    leveringswijze: '100',
    route: 'PA',
    orderDate: new Date(nextWeek),
  },
];

// Backward compatibility exports
export const ordersVandaagData = getTodayOrders(ordersData);
export const ordersToekomstData = getFutureOrders(ordersData);

// Re-export utility functions for backward compatibility
export {
  isToday,
  isFuture,
  formatOrderDate,
  getDeliveryIconFromLeveringswijze,
  getStatusIconFromRoute,
  fetchOrders,
  fetchOrdersVandaag,
  fetchOrdersToekomst,
  getTodayOrders,
  getFutureOrders,
} from '../utils';
