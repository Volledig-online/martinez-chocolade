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

export type WMSStatus = 'New' | 'Read Back' | 'Validated' | 'Sent to file' | '';
// export type WMSStatus = 'New' | 'Terug gemeld' | 'afgehandeld' | 'in bewerking' | '';

// new en in bewerking moet in vandaag lijst

/**
 * Database Order interface - matches _AB_OrderRegel_View schema
 */
export interface DatabaseOrder {
  Ordernummer: string;
  Leverdatum: Date;
  Leverwijze: string;
  Route: string | null;
  Aantal: number;
  Debiteurnummer: string;
  Debiteurnaam: string;
  Notitie: string | null;
  Magazijncode: string;
  WMS_Status: string;
  HandTerminal: string | null;
  OrderPicker: string | null;
}

/**
 * Application Order interface - normalized for frontend use
 */
export interface Order {
  id: string; // Ordernummer
  name: string; // Debiteurnaam
  quantity: number; // Aantal
  leveringswijze: Leveringswijze; // Leverwijze
  route: Route | null; // Route
  orderDate: Date; // Leverdatum
  customerNumber: string; // Debiteurnummer
  notes: string | null; // Notitie
  warehouseCode: string; // Magazijncode
  wmsStatus: WMSStatus; // WMS_Status
  handTerminal: string | null; // HandTerminal
  orderPicker: string | null; // OrderPicker
}
