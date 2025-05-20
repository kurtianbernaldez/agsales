// src/app/items/page.tsx
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { ItemType, ItemVariant } from '@/types/item';

export default function ItemsPage() {
  const [types, setTypes] = useState< ItemType[]>([]);
  const [variants, setVariants] = useState< ItemVariant[]>([]);
  const [typeForm, setTypeForm] = useState({ name: '' });
  const [variantForm, setVariantForm] = useState({ name: '', item_type_id: '', unit: '' });

  const fetchData = async () => {
    const [typesRes, variantsRes] = await Promise.all([
      axios.get('http://localhost:5000/api/item-types'),
      axios.get('http://localhost:5000/api/item-variants'),
    ]);
    setTypes(typesRes.data);
    setVariants(variantsRes.data);
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
    await axios.post('http://localhost:5000/api/item-types', typeForm);
    setTypeForm({ name: '' });
    fetchData();
  };

  const submitVariant = async () => {
    await axios.post('http://localhost:5000/api/item-variants', variantForm);
    setVariantForm({ name: '', item_type_id: '', unit: '' });
    fetchData();
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Item Types and Variants</h1>

      {/* Create Item Type */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Create Item Type</h2>
        <input
          type="text"
          name="name"
          value={typeForm.name}
          onChange={handleTypeChange}
          className="border p-2 w-full mb-2"
          placeholder="Item Type Name"
        />
        <button onClick={submitType} className="bg-green-600 text-white px-4 py-2">
          Add Type
        </button>
      </div>

      {/* Create Item Variant */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Create Item Variant</h2>
        <select
          name="item_type_id"
          value={variantForm.item_type_id}
          onChange={handleVariantChange}
          className="border p-2 w-full mb-2"
        >
          <option value="">Select Type</option>
          {types.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
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
          Add Variant
        </button>
      </div>
    </div>
  );
}
