import { Request, Response } from "express";
import { Project } from "../interfaces";
import { projectsServices } from "../services";


const createProject = async (req: Request, res: Response): Promise<Response> => {
    const project: Project = await projectsServices.createProject(req.body);
    return res.status(201).json(project);
};
  
const readProject = async (req: Request, res: Response): Promise<Response> => {
    const project: Project = await projectsServices.readProject(req);
    return res.status(200).json(project);
};

const updateProject = async (req: Request, res: Response): Promise<Response> => {
    const project: Project = await projectsServices.updateProject(req);
    return res.status(200).json(project);
};

export { createProject, readProject, updateProject }