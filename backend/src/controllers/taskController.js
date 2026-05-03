"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTasks = exports.createTask = void 0;
const express_1 = require("express");
const prisma_1 = __importDefault(require("../services/prisma"));
const createTask = async (req, res) => {
    const { content, startDate, dueDate, colorTags, category } = req.body;
    const userId = req.user.userId;
    if (new Date(dueDate) < new Date()) {
        return res.status(400).json({ error: 'Deadline cannot be in the past' });
    }
    try {
        const task = await prisma_1.default.task.create({
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
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create task' });
    }
};
exports.createTask = createTask;
const getTasks = async (req, res) => {
    const userId = req.user.userId;
    try {
        const tasks = await prisma_1.default.task.findMany({
            where: { userId },
            orderBy: { dueDate: 'asc' },
        });
        res.status(200).json(tasks);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
};
exports.getTasks = getTasks;
const updateTask = async (req, res) => {
    const { id } = req.params;
    const { content, startDate, dueDate, colorTags, category, completed } = req.body;
    const userId = req.user.userId;
    try {
        const task = await prisma_1.default.task.findUnique({ where: { id: parseInt(id) } });
        if (!task || task.userId !== userId) {
            return res.status(404).json({ error: 'Task not found' });
        }
        const updatedTask = await prisma_1.default.task.update({
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
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update task' });
    }
};
exports.updateTask = updateTask;
const deleteTask = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;
    try {
        const task = await prisma_1.default.task.findUnique({ where: { id: parseInt(id) } });
        if (!task || task.userId !== userId) {
            return res.status(404).json({ error: 'Task not found' });
        }
        await prisma_1.default.task.delete({ where: { id: parseInt(id) } });
        res.status(200).json({ message: 'Task deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete task' });
    }
};
exports.deleteTask = deleteTask;
//# sourceMappingURL=taskController.js.map