import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTasks = async( req: Request, res: Response ): Promise<void> => {
    const {projectId} = req.query;
    try {
        const tasks = await prisma.task.findMany({
            where: {
                projectId: Number(projectId),
            },
            include: {
                author: true,
                assignee: true,
                comments: true,
                attachments: true,
            },
        });

        res.json(tasks);
    } catch(error: any) {
        res.status(500).json({message: `Error Fetching tasks: ${error.message}`});      
        }
 };

 export const createTask = async (req: Request, res: Response): Promise<void> => {
    const { title, description, status, priority, tags, startDate, dueDate, points, projectId, authorUserId, assignedUserId } = req.body;

    if (!title || !projectId || !authorUserId) {
        res.status(400).json({ message: "title, projectId, and authorUserId are required" });
        return;
    }

    try {
        const newTask = await prisma.task.create({
            data: {
                title,
                description,
                status,
                priority,
                tags,
                startDate: startDate ? new Date(startDate) : undefined,
                dueDate: dueDate ? new Date(dueDate) : undefined,
                points,
                projectId,
                authorUserId,
                assignedUserId,
            }
        });

        res.status(201).json(newTask);
    } catch (error: any) {
        res.status(500).json({ message: `Error creating task: ${error.message}` });
    }
};

