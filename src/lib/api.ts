const BASE_URL = 'http://localhost:5000';

// INVENTORY
export async function getInventory() {
  const res = await fetch(`${BASE_URL}/api/inventory`);
  return res.json();
}

export async function addInventory(item: any) {
  const res = await fetch(`${BASE_URL}/api/inventory`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  return res.json();
}

export async function updateInventory(id: number, item: any) {
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

// ITEM TYPES
export async function getItemTypes() {
  const res = await fetch(`${BASE_URL}/api/item-types`);
  return res.json();
}

export async function addItemType(type: any) {
  const res = await fetch(`${BASE_URL}/api/item-types`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(type),
  });
  return res.json();
}

export async function updateItemType(id: number, type: any) {
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
export async function getItemVariants() {
  const res = await fetch(`${BASE_URL}/api/item-variants`);
  return res.json();
}

export async function addItemVariant(variant: any) {
  const res = await fetch(`${BASE_URL}/api/item-variants`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(variant),
  });
  return res.json();
}

export async function updateItemVariant(id: number, variant: any) {
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