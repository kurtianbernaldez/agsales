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
    <div className="mb-8 bg-white dark:bg-gray-800 shadow rounded-md overflow-hidden">
      {title && <h2 className="text-xl font-semibold px-4 py-2 border-b">{title}</h2>}
      {onTruncate && !isDeletedTable && (
        <button
          onClick={onTruncate}
          className="ml-4 mt-2 text-sm text-red-600">
          Truncate
        </button>
      )}
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-200">
                {col.label}
              </th>
            ))}
            {(onEdit || onDelete || onRestore) && <th className="px-3 py-2 text-gray-700 dark:text-gray-200">Actions</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {data.map((item) => (
            <tr key={(item as any).id} className="odd:bg-gray-50 dark:odd:bg-gray-800">
              {columns.map((col) => (
                <td key={col.key} className="px-3 py-2 text-gray-900 dark:odd:text-gray-100">{(item as any)[col.key]}</td>
              ))}
              {(onEdit || onDelete || onRestore) && (
                <td className="border px-2 py-1 space-x-2">
                  {onEdit && <button onClick={() => onEdit(item)} className="text-blue-500 hover:underline">Edit</button>}
                  {onDelete && !isDeletedTable && (
                    <button onClick={() => onDelete((item as any).id)} className="text-red-500 hover:underline">Delete</button>
                  )}
                  {onRestore && isDeletedTable && (
                    <button onClick={() => onRestore((item as any).id)} className="text-green-700 hover:underline">Restore</button>
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