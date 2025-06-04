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
  truncateInventory,
  getItemVariants,
  getItemTypes,
} from '@/lib/api';
import InventoryTable, { Column } from '@/components/InventoryTable';

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [deletedInventory, setDeletedInventory] = useState<InventoryItem[]>([]);
  const [variants, setVariants] = useState<ItemVariant[]>([]);
  const [types, setTypes] = useState<ItemType[]>([]);
  const [showDeleted, setShowDeleted] = useState(false);
  const [filterType, setFilterType] = useState('');
  const [form, setForm] = useState<any>({
    variant_id: '',
    received: 0,
    sold: 0,
    qty_on_hand: 0,
    total_cost_received: 0,
    avg_cost_per_piece: 0,
  });

  const fetchData = async () => {
    const [invRes, deletedInvRes, varRes, typeRes] = await Promise.all([
      getInventory(),
      getDeletedInventory(),
      getItemVariants(),
      getItemTypes(),
    ]);
    setInventory(invRes);
    setDeletedInventory(deletedInvRes);
    setVariants(varRes);
    setTypes(typeRes);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await addInventory({
      item_variant_id: parseInt(form.variant_id),
      received: Number(form.received),
      sold: Number(form.sold),
      qty_on_hand: Number(form.qty_on_hand),
      total_cost_received: Number(form.total_cost_received),
      avg_cost_per_piece: Number(form.avg_cost_per_piece),
    });
    setForm({
      variant_id: '',
      received: 0,
      sold: 0,
      qty_on_hand: 0,
      total_cost_received: 0,
      avg_cost_per_piece: 0,
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

  const handleTruncate = async () => {
    await truncateInventory();
    fetchData();
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Inventory Management</h1>

      {/* Form */}
      <div className="space-y-2">
        <select name="variant_id" value={form.variant_id} onChange={handleChange} className="border p-2 w-full">
          <option value="">Select Variant</option>
          {variants.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name}
            </option>
          ))}
        </select>
        <h1>Received</h1>
        <input type="number" name="received" value={form.received} onChange={handleChange} className="border p-2 w-full" placeholder="Received" />
        <h1>Sold</h1>
        <input type="number" name="sold" value={form.sold} onChange={handleChange} className="border p-2 w-full" placeholder="Sold" />
        <h1>Qty on Hand</h1>
        <input type="number" name="qty_on_hand" value={form.qty_on_hand} onChange={handleChange} className="border p-2 w-full" placeholder="Qty on Hand" />
        <h1>Total Cost</h1>
        <input type="number" name="total_cost_received" value={form.total_cost_received} onChange={handleChange} className="border p-2 w-full" placeholder="Total Cost" />
        <h1>Average Cost</h1>
        <input type="number" name="avg_cost_per_piece" value={form.avg_cost_per_piece} onChange={handleChange} className="border p-2 w-full" placeholder="Average Cost" />
        <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2">Add/Update</button>
      </div>

      <InventoryTable
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
        data={inventory}
        types={types}
        filterTypeId={filterType}
        onFilterChange={setFilterType}
        onDelete={handleDelete}
        onTruncate={handleTruncate}
      />

      <button
        onClick={() => setShowDeleted(!showDeleted)}
        className="mb-2 text-sm text-blue-600"
      >
        {showDeleted ? 'Hide Deleted Inventory' : 'Show Deleted Inventory'}
      </button>

      {showDeleted && (
        <InventoryTable
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
          data={deletedInventory}
          types={types}
          filterTypeId={filterType}
          onFilterChange={setFilterType}
          onRestore={handleRestore}
          isDeletedTable
        />
      )}
    </div>
  );
}
