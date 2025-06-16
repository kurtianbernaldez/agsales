// src/app/items/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { 
  ItemType, 
  ItemTypeFormData, 
  ItemVariant, 
  ItemVariantFormData 
} from '@/types/item';
import {
  getItemTypes,
  getItemVariants,
  addItemType,
  addItemVariant,
  updateItemType,
  updateItemVariant,
  deleteItemType,
  deleteItemVariant,
  getDeletedItemTypes,
  getDeletedItemVariants,
  restoreItemType,
  restoreItemVariant,
  truncateItemTypes,
  truncateItemVariants,
  truncateInventory,
} from '@/lib/api';
import ItemTable, { Column } from '@/components/itemTable';

export default function ItemsPage() {
  const [types, setTypes] = useState<ItemType[]>([]);
  const [variants, setVariants] = useState<ItemVariant[]>([]);
  const [deletedTypes, setDeletedTypes] = useState<ItemType[]>([]);
  const [deletedVariants, setDeletedVariants] = useState<ItemVariant[]>([]);
  const [typeForm, setTypeForm] = useState<ItemTypeFormData & { id?: number }>({ name: '' });
  const [variantForm, setVariantForm] = useState<ItemVariantFormData & { id?: number }>({ 
    name: '', 
    item_type_id: 0, 
    unit: '' 
  });
  const [variantFilter, setVariantFilter] = useState<string>('');
  const [showDeletedTypes, setShowDeletedTypes] = useState(false);
  const [showDeletedVariants, setShowDeletedVariants] = useState(false);

  const fetchData = async () => {
    try {
      const [typesRes, variantsRes, deletedTypesRes, deletedVariantsRes] = await Promise.all([
        getItemTypes(),
        getItemVariants(),
        getDeletedItemTypes(),
        getDeletedItemVariants(),
      ]);
      setTypes(Array.isArray(typesRes) ? typesRes : []);
      setVariants(Array.isArray(variantsRes) ? variantsRes : []);
      setDeletedTypes(Array.isArray(deletedTypesRes) ? deletedTypesRes : []);
      setDeletedVariants(Array.isArray(deletedVariantsRes) ? deletedVariantsRes : []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setTypes([]);
      setVariants([]);
      setDeletedTypes([]);
      setDeletedVariants([]);
    }
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
    setVariantForm({ name: '', item_type_id: 0, unit: '' });
    fetchData();
  };

  const removeType = async (id: number) => {
    await deleteItemType(id);
    fetchData();
  };

  const removeVariant = async (id: number) => {
    await deleteItemVariant(id);
    fetchData();
  };

  const restoreTypeHandler = async (id: number) => {
    await restoreItemType(id);
    fetchData();
  };

  const restoreVariantHandler = async (id: number) => {
    await restoreItemVariant(id);
    fetchData();
  };

  const truncateTypesHandler = async () => {
    try {
      // First truncate inventory (which references both variants and types)
      await truncateInventory();
      // Then truncate variants (which reference types)
      await truncateItemVariants();
      // Finally truncate types
      await truncateItemTypes();
      fetchData();
    } catch (error) {
      console.error('Error truncating types:', error);
    }
  };

  const truncateVariantsHandler = async () => {
    try {
      // First truncate inventory (which references variants)
      await truncateInventory();
      // Then truncate variants
      await truncateItemVariants();
      fetchData();
    } catch (error) {
      console.error('Error truncating variants:', error);
    }
  };

  const filteredVariants = variantFilter
    ? variants.filter(v => v.item_type_id === parseInt(variantFilter))
    : variants;
  const filteredDeletedVariants = variantFilter
    ? deletedVariants.filter(v => v.item_type_id === parseInt(variantFilter))
    : deletedVariants;

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
          className="border border-gray-300 rounded-md p-2 w-full "
          placeholder="Item Type Name"
        />
        <button onClick={submitType} className="bg-green-600 text-white px-4 py-2">
          {typeForm.id ? 'Update Type' : 'Add Type'}
        </button>
      </div>

      <ItemTable
        title="Item Types"
        columns={[{ key: 'name', label: 'Name' }] as Column[]}
        data={types}
        onEdit={(item) => setTypeForm({ name: (item as ItemType).name, id: (item as ItemType).id })}
        onDelete={removeType}
        onTruncate={truncateTypesHandler}
      />

      <button
        onClick={() => setShowDeletedTypes((p) => !p)}
        className="mb-4 text-sm text-blue-600 underline"
      >
        {showDeletedTypes ? 'Hide Deleted Types' : 'Show Deleted Types'}
      </button>

      {showDeletedTypes && (
        <ItemTable
          title="Deleted Item Types"
          columns={[{ key: 'name', label: 'Name' }] as Column[]}
          data={deletedTypes}
          onRestore={restoreTypeHandler}
          isDeletedTable
        />
      )}


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
          className="border border-gray-300 rounded-md p-2 w-full mb-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Variant Name"
        />
        <input
          type="text"
          name="unit"
          value={variantForm.unit}
          onChange={handleVariantChange}
          className="border border-gray-300 rounded-md p-2 w-full mb-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Unit (e.g., pcs, m, etc.)"
        />
        <button onClick={submitVariant} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          {variantForm.id ? 'Update Variant' : 'Add Variant'}
        </button>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Filter Variants by Type</label>
        <select
          value={variantFilter}
          onChange={(e) => setVariantFilter(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Types</option>
          {types.map((t) => (
            <option  className="text-blue-600"key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
      </div>


      <ItemTable
        title="Item Variants"
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'type_name', label: 'Type' },
          { key: 'unit', label: 'Unit' },
        ] as Column[]}
        data={filteredVariants}
        onEdit={(item) =>
          setVariantForm({
            name: (item as ItemVariant).name,
            unit: (item as ItemVariant).unit,
            item_type_id: (item as ItemVariant).item_type_id,
            id: (item as ItemVariant).id,
          })
        }
        onDelete={removeVariant}
        onTruncate={truncateVariantsHandler}
      />

      <button
        onClick={() => setShowDeletedVariants((p) => !p)}
        className="mb-4 text-sm text-blue-600 underline"
      >
        {showDeletedVariants ? 'Hide Deleted Variants' : 'Show Deleted Variants'}
      </button>

      {showDeletedVariants && (
        <ItemTable
          title="Deleted Item Variants"
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'type_name', label: 'Type' },
            { key: 'unit', label: 'Unit' },
          ] as Column[]}
          data={filteredDeletedVariants}
          onRestore={restoreVariantHandler}
          isDeletedTable
        />
      )}
    </div>
  );
}
