// src/app/items/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { ItemType, ItemVariant } from '@/types/item';
import {
  getItemTypes,
  getItemVariants,
  addItemType,
  addItemVariant,
  updateItemType,
  updateItemVariant,
  deleteItemType,
  deleteItemVariant,
} from '@/lib/api';

export default function ItemsPage() {
  const [types, setTypes] = useState<ItemType[]>([]);
  const [variants, setVariants] = useState<ItemVariant[]>([]);
  const [typeForm, setTypeForm] = useState<{ name: string; id?: number }>({ name: '' });
  const [variantForm, setVariantForm] = useState<{ name: string; item_type_id: string; unit: string; id?: number }>({ name: '', item_type_id: '', unit: '' });

  const fetchData = async () => {
    const [typesRes, variantsRes] = await Promise.all([
      getItemTypes(),
      getItemVariants(),
    ]);
    setTypes(typesRes);
    setVariants(variantsRes);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTypeForm({ ...typeForm, [e.target.name]: e.target.value });
  };

  const handleVariantChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setVariantForm({ ...variantForm, [e.target.name]: e.target.value });
  };

  const submitType = async () => {
    if (typeForm.id) {
      await updateItemType(typeForm.id, { name:typeForm.name});
    } else {
      await addItemType(typeForm);
    }
    setTypeForm({ name: '' });
    fetchData();
  };

  const submitVariant = async () => {
    if (variantForm.id) {
      await updateItemVariant(variantForm.id, variantForm);
    } else {
      await addItemVariant(variantForm);
    }
    setVariantForm({ name: '', item_type_id: '', unit: '' });
    fetchData();
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Item Types and Variants</h1>

      {/* Create/Edit Item Type */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{typeForm.id ? 'Edit' : 'Create'} Item Type</h2>
        <input
          type="text"
          name="name"
          value={typeForm.name}
          onChange={handleTypeChange}
          className="border p-2 w-full mb-2"
          placeholder="Item Type Name"
        />
        <button onClick={submitType} className="bg-green-600 text-white px-4 py-2">
          {typeForm.id ? 'Update Type' : 'Add Type'}
        </button>
      </div>

      <ul className="mb-8">
        {types.map((t) => (
          <li key={t.id} className="flex justify-between items-center mb-1">
            <span>{t.name}</span>
            <div className="space-x-2">
              <button onClick={() => setTypeForm({ name: t.name, id: t.id })} className="text-blue-500">Edit</button>
              <button onClick={() => { deleteItemType(t.id); fetchData(); }} className="text-red-500">Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Create/Edit Item Variant */}
      <div>
        <h2 className="text-xl font-semibold mb-2">{variantForm.id ? 'Edit' : 'Create'} Item Variant</h2>
        <select
          name="item_type_id"
          value={variantForm.item_type_id}
          onChange={handleVariantChange}
          className="border p-2 w-full mb-2"
        >
          <option value="">Select Type</option>
          {types.map((t) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
        <input
          type="text"
          name="name"
          value={variantForm.name}
          onChange={handleVariantChange}
          className="border p-2 w-full mb-2"
          placeholder="Variant Name"
        />
        <input
          type="text"
          name="unit"
          value={variantForm.unit}
          onChange={handleVariantChange}
          className="border p-2 w-full mb-2"
          placeholder="Unit (e.g., pcs, m, etc.)"
        />
        <button onClick={submitVariant} className="bg-blue-600 text-white px-4 py-2">
          {variantForm.id ? 'Update Variant' : 'Add Variant'}
        </button>
      </div>

      <ul className="mt-4">
        {variants.map((v) => (
          <li key={v.id} className="flex justify-between items-center mb-1">
            <span>{v.name} — {v.unit}</span>
            <div className="space-x-2">
              <button
                onClick={() => setVariantForm({ name: v.name, unit: v.unit, item_type_id: String(v.item_type_id), id: v.id })}
                className="text-blue-500"
              >Edit</button>
              <button
                onClick={() => { deleteItemVariant(v.id); fetchData(); }}
                className="text-red-500"
              >Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
