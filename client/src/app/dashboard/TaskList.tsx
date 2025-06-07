"use client"

import { Item } from "@/types/types"
import TaskItem from "./TaskItem"

interface Props {
  items: Item[]
  onDelete: (id: string) => void
  onEdit: (task: Item) => void
  editingId: string | null
  onSaveEdit: (id: string, title: string, description: string) => void
  onCancelEdit: () => void
  editTitle: string
  setEditTitle: (val: string) => void
  editDescription: string
  setEditDescription: (val: string) => void
}

export default function TaskList({
  items,
  onDelete,
  onEdit,
  editingId,
  onSaveEdit,
  onCancelEdit,
  editTitle,
  setEditTitle,
  editDescription,
  setEditDescription,
}: Props) {
  if (items.length === 0) return <p className="text-gray-500">No tasks yet.</p>

  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <TaskItem
          key={item._id}
          item={item}
          onDelete={onDelete}
          onEdit={onEdit}
          isEditing={editingId === item._id}
          onSaveEdit={onSaveEdit}
          onCancelEdit={onCancelEdit}
          editTitle={editTitle}
          setEditTitle={setEditTitle}
          editDescription={editDescription}
          setEditDescription={setEditDescription}
        />
      ))}
    </ul>
  )
}
