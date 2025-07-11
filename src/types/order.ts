/**
 * Order related types and interfaces
 */

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
