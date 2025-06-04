export type ItemType = {
  id: number;
  name: string;
};

export type ItemVariant = {
  id: number;
  name: string;
  item_type_id: number;
  unit: string;
  type_name?: string;
};
