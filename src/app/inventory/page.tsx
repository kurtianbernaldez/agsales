'use client';

import { useEffect, useState } from 'react';
import { InventoryItem } from '@/types/inventory';
import { ItemVariant, ItemType } from '@/types/item';
import {
  getInventory,
  addInventory,
  deleteInventory,
  getDeletedInventory,
  restoreInventory,
  getItemTypes,
  getItemVariants,
} from '@/lib/api';
import ItemTable, { Column } from '@/components/itemTable';

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [variants, setVariants] = useState<ItemVariant[]>([]);
  const [types, setTypes] = useState<ItemType[]>([]);
  const [deletedInventory, setDeletedInventory] = useState<InventoryItem[]>([]);
  const [filterType, setFilterType] = useState<string>('');
  const [showDeleted, setShowDeleted] = useState(false);
  const [form, setForm] = useState<any>({
    variant_id: '',
    received: 0,
    sold: 0,
    qty_on_hand: 0,
    total_cost_received: 0,
    avg_cost_per_piece: 0,
  });

  const fetchData = async () => {
    const [invRes, varRes, typeRes, delRes] = await Promise.all([
      getInventory(),
      getItemVariants(),
      getItemTypes(),
      getDeletedInventory(),
    ]);
    setInventory(invRes);
    setVariants(varRes);
    setTypes(typeRes);
    setDeletedInventory(delRes);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
  await addInventory(form);
  setForm({
    variant_id: '',
    received: 0,
    sold: 0,
    qty_on_hand: 0,
    total_cost_received: 0,
    avg_cost_per_piece: 0
  });
  fetchData();
};


  const handleDelete = async (id: number) => {
    await deleteInventory(id);
    fetchData();
  };

    const handleRestore = async (id: number) => {
    await restoreInventory(id);
    fetchData();
  };

  const filteredInventory = filterType
    ? inventory.filter((i) => i.type_id === parseInt(filterType))
    : inventory;
  const filteredDeletedInventory = filterType
    ? deletedInventory.filter((i) => i.type_id === parseInt(filterType))
    : deletedInventory;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Inventory Management</h1>

      {/* Form */}
      <div className="space-y-2">
        <select
          name="variant_id"
          value={form.variant_id}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 w-full focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Variant</option>
          {variants.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name}
            </option>
          ))}
        </select>
        <h1>Received</h1>
        <input
          type="number"
          name="received"
          value={form.received}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 w-full focus:ring-blue-500 focus:border-blue-500"
          placeholder="Received"
        />
        <h1>Sold</h1>
        <input
          type="number"
          name="sold"
          value={form.sold}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 w-full focus:ring-blue-500 focus:border-blue-500"
          placeholder="Sold"
        />
        <h1>Qty on Hand</h1>
        <input
          type="number"
          name="qty_on_hand"
          value={form.qty_on_hand}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 w-full focus:ring-blue-500 focus:border-blue-500"
          placeholder="Qty on Hand"
        />
        <h1>Total Cost</h1>
        <input
          type="number"
          name="total_cost_received"
          value={form.total_cost_received}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 w-full focus:ring-blue-500 focus:border-blue-500"
          placeholder="Total Cost"
        />
        <h1>Average Cost</h1>
        <input
          type="number"
          name="avg_cost_per_piece"
          value={form.avg_cost_per_piece}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 w-full focus:ring-blue-500 focus:border-blue-500"
          placeholder="Average Cost"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add/Update
        </button>
      </div>

      {/* Table */}
      <div className="mt-8">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Filter by Type</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Types</option>
            {types.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        <ItemTable
          title="Inventory"
          columns={[
            { key: 'variant_name', label: 'Variant' },
            { key: 'type_name', label: 'Type' },
            { key: 'received', label: 'Received' },
            { key: 'sold', label: 'Sold' },
            { key: 'qty_on_hand', label: 'Qty' },
            { key: 'total_cost_received', label: 'Total Cost' },
            { key: 'avg_cost_per_piece', label: 'Avg Cost' },
          ] as Column[]}
          data={filteredInventory}
          onDelete={handleDelete}
        />

        <button
          onClick={() => setShowDeleted((p) => !p)}
          className="mb-4 text-sm text-blue-600 underline"
        >
          {showDeleted ? 'Hide Deleted Inventory' : 'Show Deleted Inventory'}
        </button>

        {showDeleted && (
          <ItemTable
            title="Deleted Inventory"
            columns={[
              { key: 'variant_name', label: 'Variant' },
              { key: 'type_name', label: 'Type' },
              { key: 'received', label: 'Received' },
              { key: 'sold', label: 'Sold' },
              { key: 'qty_on_hand', label: 'Qty' },
              { key: 'total_cost_received', label: 'Total Cost' },
              { key: 'avg_cost_per_piece', label: 'Avg Cost' },
            ] as Column[]}
            data={filteredDeletedInventory}
            onRestore={handleRestore}
            isDeletedTable
          />
        )}
      </div>
    </div>
  );
}
