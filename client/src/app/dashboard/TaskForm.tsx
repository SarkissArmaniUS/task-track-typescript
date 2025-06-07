"use client"

import { useState } from "react"
import { apiFetch } from "@/utils/api"
import { Item } from "@/types/types"

interface Props {
  onAdd: (task: Item) => void
}

export default function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !description) return

    try {
      const res = await apiFetch<{ task: Item }>("/task", {
        method: "POST",
        body: JSON.stringify({ title, description }),
      })
      onAdd(res.task)
      setTitle("")
      setDescription("")
    } catch {
      alert("Error creating task")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 space-y-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="Title"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="Description"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Create
      </button>
    </form>
  )
}
