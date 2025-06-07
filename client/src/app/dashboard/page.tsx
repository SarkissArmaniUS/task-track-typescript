"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/utils/api";
import { Item } from "@/types/types";

import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const [items, setItems] = useState<Item[]>([]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    if (!user) {
      router.push("/");
      return;
    }

    (async () => {
      try {
        const res = await apiFetch<Item[] | { message: string }>("/task");
        setItems(Array.isArray(res) ? res : []);
      } catch (error) {
        alert("Error loading tasks");
      }
    })();
  }, [user, router]);

  const handleAdd = (task: Item) => {
    setItems((prev) => [...prev, task]);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this task?")) return;

    try {
      await apiFetch(`/task/${id}`, { method: "DELETE" });
      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch {
      alert("Failed to delete task");
    }
  };

  const startEdit = (item: Item) => {
    setEditingId(item._id);
    setEditTitle(item.title);
    setEditDescription(item.description);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
  };

  const handleEditSubmit = async (
    id: string,
    title: string,
    description: string
  ) => {
    try {
      const res = await apiFetch<{ task: Item }>(`/task/${id}`, {
        method: "PUT",
        body: JSON.stringify({ title, description }),
      });

      setItems((prev) =>
        prev.map((item) => (item._id === id ? res.task : item))
      );
      cancelEdit();
    } catch {
      alert("Error updating task");
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <button
        onClick={logout}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mb-6"
      >
        Log Out
      </button>

      <h1 className="text-2xl font-semibold mb-6">Add Task</h1>
      <TaskForm onAdd={handleAdd} />

      <h2 className="text-xl font-semibold mb-4">Tasks</h2>
      <TaskList
        items={items}
        onDelete={handleDelete}
        onEdit={startEdit}
        editingId={editingId}
        onSaveEdit={handleEditSubmit}
        onCancelEdit={cancelEdit}
        editTitle={editTitle}
        setEditTitle={setEditTitle}
        editDescription={editDescription}
        setEditDescription={setEditDescription}
      />
    </div>
  );
}
