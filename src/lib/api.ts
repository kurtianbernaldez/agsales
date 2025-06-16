import { 
  ItemType, 
  ItemTypeFormData, 
  ItemVariant, 
  ItemVariantFormData, 
  InventoryItem, 
  InventoryFormData,
  Purchase,
  PurchaseFormData,
  Offset,
  OffsetFormData
} from '@/types/item';

const BASE_URL = 'http://localhost:5000';

// INVENTORY
export async function getInventory(): Promise<InventoryItem[]> {
  const res = await fetch(`${BASE_URL}/api/inventory`);
  return res.json();
}

export async function addInventory(item: InventoryFormData): Promise<InventoryItem> {
  const res = await fetch(`${BASE_URL}/api/inventory`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  return res.json();
}

export async function updateInventory(id: number, item: InventoryFormData): Promise<InventoryItem> {
  const res = await fetch(`${BASE_URL}/api/inventory/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  return res.json();
}

export async function deleteInventory(id: number) {
  const res = await fetch(`${BASE_URL}/api/inventory/${id}`, {
    method: 'DELETE',
  });
  return res.json();
}

export async function getDeletedInventory() {
  const res = await fetch(`${BASE_URL}/api/inventory/deleted/all`);
  return res.json();
}

export async function restoreInventory(id: number) {
  const res = await fetch(`${BASE_URL}/api/inventory/restore/${id}`, { method: 'POST' });
  return res.json();
}

export async function truncateInventory() {
  const res = await fetch(`${BASE_URL}/api/inventory/truncate/all`, { method: 'DELETE' });
  return res.json();
}

// ITEM TYPES
export async function getItemTypes(): Promise<ItemType[]> {
  const res = await fetch(`${BASE_URL}/api/item-types`);
  return res.json();
}

export async function addItemType(type: ItemTypeFormData): Promise<ItemType> {
  const res = await fetch(`${BASE_URL}/api/item-types`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(type),
  });
  return res.json();
}

export async function updateItemType(id: number, type: ItemTypeFormData): Promise<ItemType> {
  const res = await fetch(`${BASE_URL}/api/item-types/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(type),
  });
  return res.json();
}

export async function deleteItemType(id: number) {
  const res = await fetch(`${BASE_URL}/api/item-types/${id}`, { method: 'DELETE' });
  return res.json();
}

export async function getDeletedItemTypes() {
  const res = await fetch(`${BASE_URL}/api/item-types/deleted/all`);
  return res.json();
}

export async function restoreItemType(id: number) {
  const res = await fetch(`${BASE_URL}/api/item-types/restore/${id}`, { method: 'POST' });
  return res.json();
}

export async function truncateItemTypes() {
  const res = await fetch(`${BASE_URL}/api/item-types/truncate/all`, { method: 'DELETE' });
  return res.json();
}

// ITEM VARIANTS
export async function getItemVariants(): Promise<ItemVariant[]> {
  const res = await fetch(`${BASE_URL}/api/item-variants`);
  return res.json();
}

export async function addItemVariant(variant: ItemVariantFormData): Promise<ItemVariant> {
  const res = await fetch(`${BASE_URL}/api/item-variants`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(variant),
  });
  return res.json();
}

export async function updateItemVariant(id: number, variant: ItemVariantFormData): Promise<ItemVariant> {
  const res = await fetch(`${BASE_URL}/api/item-variants/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(variant),
  });
  return res.json();
}

export async function deleteItemVariant(id: number) {
  const res = await fetch(`${BASE_URL}/api/item-variants/${id}`, { method: 'DELETE' });
  return res.json();
}

export async function getDeletedItemVariants() {
  const res = await fetch(`${BASE_URL}/api/item-variants/deleted/all`);
  return res.json();
}

export async function restoreItemVariant(id: number) {
  const res = await fetch(`${BASE_URL}/api/item-variants/restore/${id}`, { method: 'POST' });
  return res.json();
}

export async function truncateItemVariants() {
  const res = await fetch(`${BASE_URL}/api/item-variants/truncate/all`, { method: 'DELETE' });
  return res.json();
}

// PURCHASES
export async function getPurchases(): Promise<Purchase[]> {
  const res = await fetch(`${BASE_URL}/api/purchases`);
  return res.json();
}

export async function addPurchase(purchase: PurchaseFormData): Promise<Purchase> {
  const res = await fetch(`${BASE_URL}/api/purchases`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(purchase),
  });
  return res.json();
}

export async function updatePurchase(id: number, purchase: PurchaseFormData): Promise<Purchase> {
  const res = await fetch(`${BASE_URL}/api/purchases/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(purchase),
  });
  return res.json();
}

export async function deletePurchase(id: number) {
  const res = await fetch(`${BASE_URL}/api/purchases/${id}`, {
    method: 'DELETE',
  });
  return res.json();
}

export async function getDeletedPurchases(): Promise<Purchase[]> {
  const res = await fetch(`${BASE_URL}/api/purchases/deleted`);
  return res.json();
}

export async function restorePurchase(id: number) {
  const res = await fetch(`${BASE_URL}/api/purchases/restore/${id}`, { method: 'POST' });
  return res.json();
}

// OFFSETS
export async function getOffsets(): Promise<Offset[]> {
  const res = await fetch(`${BASE_URL}/api/offsets`);
  return res.json();
}

export async function addOffset(offset: OffsetFormData): Promise<Offset> {
  const res = await fetch(`${BASE_URL}/api/offsets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(offset),
  });
  return res.json();
}

export async function updateOffset(id: number, offset: OffsetFormData): Promise<Offset> {
  const res = await fetch(`${BASE_URL}/api/offsets/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(offset),
  });
  return res.json();
}

export async function deleteOffset(id: number) {
  const res = await fetch(`${BASE_URL}/api/offsets/${id}`, {
    method: 'DELETE',
  });
  return res.json();
}

export async function getDeletedOffsets(): Promise<Offset[]> {
  const res = await fetch(`${BASE_URL}/api/offsets/deleted`);
  return res.json();
}

export async function restoreOffset(id: number) {
  const res = await fetch(`${BASE_URL}/api/offsets/restore/${id}`, { method: 'POST' });
  return res.json();
}