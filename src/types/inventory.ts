export type InventoryItem = {
  id: number;
  item_variant_id: number;
  received: number;
  sold: number;
  qty_on_hand: number;
  total_cost_received: number;
  avg_cost_per_piece: number;
  variant_name: string;
  unit: string;
  type_name: string;
  type_id: number;
};
