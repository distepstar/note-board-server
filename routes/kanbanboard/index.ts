import express, { Router, Request, Response, NextFunction } from "express";
import { Kanban } from "../../controllers/Kanban";

export const kanbanRouter: Router = Router();

// middleware
kanbanRouter.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Kanban API call Times: ${Date.now()}`);
  next();
});

kanbanRouter.get("/kanbanapi", Kanban.getAllKanbanData);
kanbanRouter.get("/kanbanapi/:id", Kanban.getKanbanDataById);
kanbanRouter.post("/kanbanapi/:id", Kanban.updateKanbanDataById);
kanbanRouter.put("/kanbanapi/create");

