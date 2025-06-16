export type ItemType = {
  id: number;
  name: string;
  is_deleted?: boolean;
};

export type ItemTypeFormData = {
  name: string;
};

export type ItemVariant = {
  id: number;
  name: string;
  item_type_id: number;
  unit: string;
  type_name?: string;
  is_deleted?: boolean;
};

export type ItemVariantFormData = {
  name: string;
  item_type_id: number;
  unit: string;
};

export type InventoryItem = {
  id: number;
  item_variant_id: number;
  item_type_id: number;
  received: number;
  sold: number;
  qty_on_hand: number;
  total_cost_received: number;
  avg_cost_per_piece: number;
  is_deleted: boolean;
  // Additional fields from joins
  variant_name?: string;
  unit?: string;
  type_name?: string;
};

export type InventoryFormData = Omit<InventoryItem, 'id' | 'is_deleted' | 'variant_name' | 'unit' | 'type_name'>;

export type Purchase = {
  id: number;
  item_variant_id: number;
  purchase_date: string;
  quantity: number;
  unit: string;
  cost: number;
  total_cost: number;
  vendor: string;
  is_deleted: boolean;
  // Additional fields from joins
  variant_name?: string;
};

export type PurchaseFormData = Omit<Purchase, 'id' | 'is_deleted' | 'variant_name'>;

export type Offset = {
  id: number;
  item_variant_id: number;
  branch: string;
  description: string;
  quantity: number;
  offset_date: string;
  remarks: string;
  is_deleted: boolean;
  // Additional fields from joins
  variant_name?: string;
};

export type OffsetFormData = Omit<Offset, 'id' | 'is_deleted' | 'variant_name'>;
