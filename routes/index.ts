import {Router, Request, Response} from "express";
import { kanbanRouter } from "./kanbanboard";


export const defaultRouter = Router();

defaultRouter.use('/kanbanboard', kanbanRouter);
defaultRouter.get('/', (req: Request, res: Response) => {
  res.send('Note Board Server is Running');
});
