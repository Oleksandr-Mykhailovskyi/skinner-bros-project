export interface BillModel {
  id: number;
  documentId: string;
  bol_id: number;
  job_id: string;
  bol_number: string;
  shipper_name: string;
  shipper_address: string;
  consignee_name: string;
  consignee_address: string;
  pickup_date: Date;
  delivery_date: Date;
  cargo_description: string;
  quality: string;
  weight: string;
  special_instructions: string;
  creator: string;
  creation_place: string;
}
