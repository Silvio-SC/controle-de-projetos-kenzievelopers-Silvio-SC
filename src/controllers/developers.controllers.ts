import { Request, Response } from "express";
import { Developer, DeveloperInfos } from "../interfaces";
import { developersServices } from "../services/";

const createDev = async (req: Request, res: Response): Promise<Response> => {
  const developer: Developer = await developersServices.createDeveloper(req.body);
  return res.status(201).json(developer);
};

const readDev = async (req: Request, res: Response): Promise<Response> => {
  const developer: Developer = await developersServices.readDeveloper(req);
  return res.status(200).json(developer);
};

const updateDev = async (req: Request, res: Response): Promise<Response> => {
  const developer: Developer = await developersServices.updateDeveloper(req);
  return res.status(200).json(developer);
};

const deleteDev = async (req: Request, res: Response): Promise<Response> => {
  const developer: Developer = await developersServices.deleteDeveloper(req);
  return res.status(204).json(developer);
};

const addDevInfo = async (req: Request, res: Response): Promise<Response> => {
  const devInfoReq = {...req.body, developerId: req.params.id}
  const devInfo: DeveloperInfos = await developersServices.addDeveloperInfos(devInfoReq);
  return res.status(201).json(devInfo);
};

export { createDev, readDev, updateDev, deleteDev, addDevInfo };