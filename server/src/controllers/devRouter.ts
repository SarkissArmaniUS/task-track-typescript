import { Request, Response } from "express";
import Task from "../db/tasks";

// CRUD Operations
export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find()
    tasks.length === 0
      ? res.status(200).json({ message: 'No tasks yet. Add one!' })
      : res.status(200).json(tasks)
  } catch (error) {
    console.log(error)
    res.sendStatus(400)
  }
}

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body
    if (!title || !description)
      return res.status(400).json({ error: 'Title and description required' })

    const newTask = new Task({ title, description })
    await newTask.save()

    res.status(201).json({ message: 'Task created', task: newTask })
  } catch (error) {
    console.log(error)
    res.sendStatus(400)
  }
}

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { title, description } = req.body

    const task = await Task.findById(id)
    if (!task) return res.status(404).json({ error: 'Task not found' })

    task.title = title || task.title
    task.description = description || task.description

    await task.save()
    res.json({ message: 'Task updated', task })
  } catch (error) {
    console.log(error)
    res.sendStatus(400)
  }
}


export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const deletedTask = await Task.findByIdAndDelete(id)
    if (!deletedTask)
      return res.status(404).json({ error: 'Task not found' })

    res.json({ message: 'Task deleted' })
  } catch (error) {
    console.log(error)
    res.sendStatus(400)
  }
}
