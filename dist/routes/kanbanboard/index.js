"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kanbanRouter = void 0;
const express_1 = require("express");
const Kanban_1 = require("../../controllers/Kanban");
const KanbanProject_1 = require("../../controllers/KanbanProject");
exports.kanbanRouter = (0, express_1.Router)();
// middleware
exports.kanbanRouter.use((req, res, next) => {
    console.log(`Kanban API call Times: ${Date.now()}`);
    next();
});
// get request
// kanban data
exports.kanbanRouter.get("/kanbanapi/kanbandata", Kanban_1.Kanban.getAllKanbanData);
exports.kanbanRouter.get("/kanbanapi/kanbandata/:id", Kanban_1.Kanban.getKanbanDataById);
exports.kanbanRouter.get("/kanbanapi/kanbandata/project/:projectId", Kanban_1.Kanban.getKanbanDataByProjectId);
// kanban project
exports.kanbanRouter.get("/kanbanapi/kanbanproject", KanbanProject_1.KanbanProject.getAllKanbanProject);
// post request
// kanban data
exports.kanbanRouter.post("/kanbanapi/kanbandata/create", Kanban_1.Kanban.createKanbanData);
// put request
exports.kanbanRouter.put("/kanbanapi/kanbandata/:id", Kanban_1.Kanban.updateKanbanDataById);
