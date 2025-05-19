'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

type InventoryItem = {
  id: number;
  variant_id: number;
  received: number;
  sold: number;
  qty_on_hand: number;
  total_cost_received: number;
  avg_cost_per_piece: number;
  variant_name: string;
  unit: string;
  type_name: string;
};

type Variant = { id: number; name: string; item_type_id: number };
type Type = { id: number; name: string };

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [types, setTypes] = useState<Type[]>([]);
  const [form, setForm] = useState<any>({
    variant_id: '',
    received: 0,
    sold: 0,
    qty_on_hand: 0,
    total_cost_received: 0,
    avg_cost_per_piece: 0,
  });

  const fetchData = async () => {
    const [invRes, varRes, typeRes] = await Promise.all([
      axios.get('/api/inventory'),
      axios.get('/api/variants'),
      axios.get('/api/types'),
    ]);
    setInventory(invRes.data);
    setVariants(varRes.data);
    setTypes(typeRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await axios.post('/api/inventory', form);
    setForm({ variant_id: '', received: 0, sold: 0, qty_on_hand: 0, total_cost_received: 0, avg_cost_per_piece: 0 });
    fetchData();
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`/api/inventory/${id}`);
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
        <input type="number" name="received" value={form.received} onChange={handleChange} className="border p-2 w-full" placeholder="Received" />
        <input type="number" name="sold" value={form.sold} onChange={handleChange} className="border p-2 w-full" placeholder="Sold" />
        <input type="number" name="qty_on_hand" value={form.qty_on_hand} onChange={handleChange} className="border p-2 w-full" placeholder="Qty on Hand" />
        <input type="number" name="total_cost_received" value={form.total_cost_received} onChange={handleChange} className="border p-2 w-full" placeholder="Total Cost" />
        <input type="number" name="avg_cost_per_piece" value={form.avg_cost_per_piece} onChange={handleChange} className="border p-2 w-full" placeholder="Average Cost" />
        <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2">Add/Update</button>
      </div>

      {/* Table */}
      <table className="table-auto w-full mt-8 border">
        <thead>
          <tr className="bg-gray-200">
            <th>ID</th>
            <th>Variant</th>
            <th>Type</th>
            <th>Received</th>
            <th>Sold</th>
            <th>Qty</th>
            <th>Total Cost</th>
            <th>Avg Cost</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.id} className="text-center border-t">
              <td>{item.id}</td>
              <td>{item.variant_name}</td>
              <td>{item.type_name}</td>
              <td>{item.received}</td>
              <td>{item.sold}</td>
              <td>{item.qty_on_hand}</td>
              <td>{item.total_cost_received}</td>
              <td>{item.avg_cost_per_piece}</td>
              <td>
                <button onClick={() => handleDelete(item.id)} className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
