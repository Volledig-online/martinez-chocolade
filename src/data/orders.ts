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
}

// Orders for today (smaller dataset)
export const ordersVandaagData: Order[] = [
  {
    id: '83648',
    name: 'Chocolaterie Amsterdam De Pijp',
    quantity: 12,
    leveringswijze: '32',
    route: 'PA',
  },
  {
    id: '15973',
    name: 'Chocolaterie Amsterdam De Pijp',
    quantity: 17,
    leveringswijze: '100',
    route: 'PA',
  },
  {
    id: '94712',
    name: 'Chocolaterie Amsterdam De Pijp',
    quantity: 1,
    leveringswijze: 'DDP',
    route: 'PA',
  },
  {
    id: '56239',
    name: 'Van Ekris Chocola',
    quantity: 1,
    leveringswijze: '10',
    route: 'KA',
  },
  {
    id: '38476',
    name: 'Van Ekris Chocola',
    quantity: 10,
    leveringswijze: '60',
    route: 'KA',
  },
  {
    id: '24689',
    name: 'Van Ekris Chocola',
    quantity: 8,
    leveringswijze: 'EXW',
    route: 'KA',
  },
  {
    id: '11234',
    name: 'Van Ekris Chocola',
    quantity: 3,
    leveringswijze: '70',
    route: 'KA',
  },
  {
    id: '71824',
    name: 'Van Ekris Chocola',
    quantity: 3,
    leveringswijze: '10',
    route: 'KA',
  },
];

// Orders for future (larger dataset with scrolling)
export const ordersToekomstData: Order[] = [
  {
    id: '11235',
    name: 'Van Ekris Chocola',
    quantity: 3,
    leveringswijze: '60',
    route: 'KA',
  },
  {
    id: '99001',
    name: 'Bakkerij De Vrolijke Taart',
    quantity: 5,
    leveringswijze: 'CIF',
    route: 'MP',
  },
  {
    id: '99002',
    name: 'Café Central Amsterdam',
    quantity: 2,
    leveringswijze: 'EXW',
    route: 'KA',
  },
  {
    id: '99003',
    name: 'Restaurant De Gouden Lepel',
    quantity: 15,
    leveringswijze: 'DAP',
    route: 'PA',
  },
  {
    id: '99004',
    name: 'Ijssalon Bella Vista',
    quantity: 7,
    leveringswijze: '70',
    route: 'KA',
  },
  {
    id: '99005',
    name: 'Hotel Grand Plaza',
    quantity: 25,
    leveringswijze: '50',
    route: 'PA',
  },
  // Additional orders to create scrolling (22 more orders for total of 28)
  {
    id: '99006',
    name: 'Patisserie La Belle Époque',
    quantity: 8,
    leveringswijze: 'CPT',
    route: 'MP',
  },
  {
    id: '99007',
    name: 'Chocolaterie Artisanale',
    quantity: 4,
    leveringswijze: '10',
    route: 'KA',
  },
  {
    id: '99008',
    name: 'Brasserie De Gouden Leeuw',
    quantity: 20,
    leveringswijze: 'FCA',
    route: 'PA',
  },
  {
    id: '99009',
    name: 'Tearoom Victoria',
    quantity: 6,
    leveringswijze: '60',
    route: 'KA',
  },
  {
    id: '99010',
    name: 'Confiserie Van Der Berg',
    quantity: 12,
    leveringswijze: '90',
    route: 'MP',
  },
  {
    id: '99011',
    name: 'Café De Oude Markt',
    quantity: 3,
    leveringswijze: 'EXW',
    route: 'KA',
  },
  {
    id: '99012',
    name: 'Restaurant Chez Pierre',
    quantity: 18,
    leveringswijze: 'DDP',
    route: 'PA',
  },
  {
    id: '99013',
    name: 'Lunchroom De Zonnebloem',
    quantity: 9,
    leveringswijze: '70',
    route: 'KA',
  },
  {
    id: '99014',
    name: 'Hotel De Kroon',
    quantity: 30,
    leveringswijze: '32',
    route: 'PA',
  },
  {
    id: '99015',
    name: 'Chocolaterie Bonbon',
    quantity: 5,
    leveringswijze: '10',
    route: 'KA',
  },
  {
    id: '99016',
    name: 'Bistro Le Jardin',
    quantity: 14,
    leveringswijze: 'CIF',
    route: 'MP',
  },
  {
    id: '99017',
    name: 'Koffiehuis De Beurs',
    quantity: 7,
    leveringswijze: '60',
    route: 'KA',
  },
  {
    id: '99018',
    name: 'Grand Café Amsterdam',
    quantity: 22,
    leveringswijze: '100',
    route: 'PA',
  },
  {
    id: '99019',
    name: 'Patisserie Royale',
    quantity: 11,
    leveringswijze: 'DAP',
    route: 'MP',
  },
  {
    id: '99020',
    name: 'Chocolaterie De Gouden Cacao',
    quantity: 16,
    leveringswijze: '70',
    route: 'KA',
  },
  {
    id: '99021',
    name: 'Restaurant De Zilveren Lepel',
    quantity: 13,
    leveringswijze: 'CIF',
    route: 'PA',
  },
  {
    id: '99022',
    name: 'Café De Blauwe Druif',
    quantity: 4,
    leveringswijze: 'EXW',
    route: 'KA',
  },
  {
    id: '99023',
    name: 'Hotel Boutique Amsterdam',
    quantity: 28,
    leveringswijze: '50',
    route: 'PA',
  },
  {
    id: '99024',
    name: 'Patisserie Van Houten',
    quantity: 9,
    leveringswijze: '10',
    route: 'MP',
  },
  {
    id: '99025',
    name: 'Brasserie De Gouden Kroon',
    quantity: 19,
    leveringswijze: 'DAP',
    route: 'PA',
  },
  {
    id: '99026',
    name: 'Chocolaterie Praline',
    quantity: 6,
    leveringswijze: '60',
    route: 'KA',
  },
  {
    id: '99027',
    name: 'Grand Hotel Europa',
    quantity: 35,
    leveringswijze: '100',
    route: 'PA',
  },
];

// Backward compatibility - defaults to today's orders
export const ordersData: Order[] = ordersVandaagData;

// Business logic mappers
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

// Functions to simulate fetching data
export const fetchOrders = async (): Promise<Order[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return ordersData;
};

export const fetchOrdersVandaag = async (): Promise<Order[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return ordersVandaagData;
};

export const fetchOrdersToekomst = async (): Promise<Order[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return ordersToekomstData;
};
