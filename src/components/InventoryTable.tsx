import React from 'react';
import { InventoryItem } from '@/types/inventory';
import { ItemType } from '@/types/item';

export type Column = { key: string; label: string };

export interface InventoryTableProps {
  title?: string;
  columns: Column[];
  data: InventoryItem[];
  types: ItemType[];
  filterTypeId: string;
  onFilterChange: (id: string) => void;
  onEdit?: (item: InventoryItem) => void;
  onDelete?: (id: number) => void;
  onRestore?: (id: number) => void;
  onTruncate?: () => void;
  isDeletedTable?: boolean;
}

export default function InventoryTable(props: InventoryTableProps) {
  const {
    title,
    columns,
    data,
    types,
    filterTypeId,
    onFilterChange,
    onEdit,
    onDelete,
    onRestore,
    onTruncate,
    isDeletedTable,
  } = props;

  const filtered = filterTypeId
    ? data.filter((d) => String(d.item_type_id) === filterTypeId)
    : data;

  return (
    <div className="mb-8">
      {title && <h2 className="text-xl font-semibold mb-2">{title}</h2>}
      <div className="flex items-center gap-2 mb-2">
        <select
          value={filterTypeId}
          onChange={(e) => onFilterChange(e.target.value)}
          className="border p-1 text-sm"
        >
          <option value="">All Types</option>
          {types.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
        {onTruncate && (
          <button
            onClick={onTruncate}
            className="bg-red-600 text-white px-2 py-1 text-sm rounded"
          >
            Truncate
          </button>
        )}
      </div>
      <table className="min-w-full border border-gray-300 rounded shadow-sm text-sm">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="border px-2 py-1 text-left">
                {col.label}
              </th>
            ))}
            {(onEdit || onDelete || onRestore) && (
              <th className="border px-2 py-1">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {filtered.map((item) => (
            <tr key={item.id} className="border-t">
              {columns.map((col) => (
                <td key={col.key} className="border px-2 py-1">
                  {(item as any)[col.key]}
                </td>
              ))}
              {(onEdit || onDelete || onRestore) && (
                <td className="border px-2 py-1 space-x-2">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(item)}
                      className="text-blue-500"
                    >
                      Edit
                    </button>
                  )}
                  {onDelete && !isDeletedTable && (
                    <button
                      onClick={() => onDelete(item.id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  )}
                  {onRestore && isDeletedTable && (
                    <button
                      onClick={() => onRestore(item.id)}
                      className="text-green-600"
                    >
                      Restore
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
