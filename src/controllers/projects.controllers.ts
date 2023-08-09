

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