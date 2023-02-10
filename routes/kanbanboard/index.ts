import express, { Router, Request, Response, NextFunction } from "express";
import { Kanban } from "../../controllers/Kanban";
import { KanbanProject } from "../../controllers/KanbanProject";

export const kanbanRouter: Router = Router();

// middleware
kanbanRouter.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Kanban API call Times: ${Date.now()}`);
  next();
});

// get request
// kanban data
kanbanRouter.get("/kanbanapi/kanbandata", Kanban.getAllKanbanData);
kanbanRouter.get("/kanbanapi/kanbandata/:id", Kanban.getKanbanDataById);
kanbanRouter.get("/kanbanapi/kanbandata/project/:projectId", Kanban.getKanbanDataByProjectId);
// kanban project
kanbanRouter.get("/kanbanapi/kanbanproject", KanbanProject.getAllKanbanProject);
// post request
// kanban data
kanbanRouter.post("/kanbanapi/kanbandata/create", Kanban.createKanbanData);
// put request
kanbanRouter.put("/kanbanapi/kanbandata/:id", Kanban.updateKanbanDataById);
