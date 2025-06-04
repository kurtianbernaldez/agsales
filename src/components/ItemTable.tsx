import React from 'react';

export type Column = {
  key: string;
  label: string;
};

export interface ItemTableProps<T> {
  title?: string;
  columns: Column[];
  data: T[];
  onEdit?: (item: T) => void;
  onDelete?: (id: number) => void;
  onRestore?: (id: number) => void;
  onTruncate?: () => void;
  isDeletedTable?: boolean;
}

export default function ItemTable<T extends { id: number }>(props: ItemTableProps<T>) {
  const { title, columns, data, onEdit, onDelete, onRestore, onTruncate, isDeletedTable } = props;
  return (
    <div className="mb-8">
      {title && <h2 className="text-xl font-semibold mb-2">{title}</h2>}
      {onTruncate && (
        <button onClick={onTruncate} className="mb-2 bg-red-600 text-white px-2 py-1 text-sm rounded">
          Truncate
        </button>
      )}
      <table className="min-w-full border border-gray-300 rounded shadow-sm text-sm">
        <thead className="bg-gray-100">
          <tr>
            {columns.map(col => (
              <th key={col.key} className="border px-2 py-1 text-left">{col.label}</th>
            ))}
            {(onEdit || onDelete || onRestore) && <th className="border px-2 py-1">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={(item as any).id} className="border-t">
              {columns.map(col => (
                <td key={col.key} className="border px-2 py-1">{(item as any)[col.key]}</td>
              ))}
              {(onEdit || onDelete || onRestore) && (
                <td className="border px-2 py-1 space-x-2">
                  {onEdit && <button onClick={() => onEdit(item)} className="text-blue-500">Edit</button>}
                  {onDelete && !isDeletedTable && (
                    <button onClick={() => onDelete((item as any).id)} className="text-red-500">Delete</button>
                  )}
                  {onRestore && isDeletedTable && (
                    <button onClick={() => onRestore((item as any).id)} className="text-green-600">Restore</button>
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
