"use client"

import { Item } from "@/types/types"

interface Props {
  item: Item
  onDelete: (id: string) => void
  onEdit: (task: Item) => void
  isEditing: boolean
  onSaveEdit: (id: string, title: string, description: string) => void
  onCancelEdit: () => void
  editTitle: string
  setEditTitle: (val: string) => void
  editDescription: string
  setEditDescription: (val: string) => void
}

export default function TaskItem({
  item,
  onDelete,
  onEdit,
  isEditing,
  onSaveEdit,
  onCancelEdit,
  editTitle,
  setEditTitle,
  editDescription,
  setEditDescription,
}: Props) {
  return (
    <li className="border border-gray-200 p-4 rounded shadow-sm">
      {isEditing ? (
        <div className="space-y-2">
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <div className="flex gap-2">
            <button
              onClick={() =>
                onSaveEdit(item._id, editTitle, editDescription)
              }
              className="px-3 py-1 bg-green-600 text-white rounded"
            >
              Save
            </button>
            <button
              onClick={onCancelEdit}
              className="px-3 py-1 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <h3 className="text-lg font-medium">{item.title}</h3>
          <p className="text-gray-600">{item.description}</p>
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => onEdit(item)}
              className="px-3 py-1 bg-yellow-500 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(item._id)}
              className="px-3 py-1 bg-red-600 text-white rounded"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  )
}
