import { Request, Response } from 'express';
import prisma from '../services/prisma';

export const createTask = async (req: any, res: Response) => {
  const { content, startDate, dueDate, colorTags, category } = req.body;
  const userId = req.user.userId;

  if (new Date(dueDate) < new Date()) {
    return res.status(400).json({ error: 'Deadline cannot be in the past' });
  }

  try {
    const task = await prisma.task.create({
      data: {
        content,
        startDate: new Date(startDate),
        dueDate: new Date(dueDate),
        colorTags,
        category,
        userId,
      },
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

export const getTasks = async (req: any, res: Response) => {
  const userId = req.user.userId;

  try {
    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: { dueDate: 'asc' },
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

export const updateTask = async (req: any, res: Response) => {
  const { id } = req.params;
  const { content, startDate, dueDate, colorTags, category, completed } = req.body;
  const userId = req.user.userId;

  try {
    const task = await prisma.task.findUnique({ where: { id: parseInt(id) } });
    if (!task || task.userId !== userId) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id) },
      data: {
        content,
        startDate: startDate ? new Date(startDate) : undefined,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        colorTags,
        category,
        completed,
      },
    });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

export const deleteTask = async (req: any, res: Response) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const task = await prisma.task.findUnique({ where: { id: parseInt(id) } });
    if (!task || task.userId !== userId) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await prisma.task.delete({ where: { id: parseInt(id) } });
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};
