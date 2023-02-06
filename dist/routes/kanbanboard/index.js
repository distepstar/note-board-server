"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kanbanRouter = void 0;
const express_1 = require("express");
const Kanban_1 = require("../../controllers/Kanban");
exports.kanbanRouter = (0, express_1.Router)();
// middleware
exports.kanbanRouter.use((req, res, next) => {
    console.log(`Kanban API call Times: ${Date.now()}`);
    next();
});
exports.kanbanRouter.get("/kanbanapi", Kanban_1.Kanban.getAllKanbanData);
exports.kanbanRouter.get("/kanbanapi/:id", Kanban_1.Kanban.getKanbanDataById);
exports.kanbanRouter.post("/kanbanapi/:id", Kanban_1.Kanban.updateKanbanDataById);
exports.kanbanRouter.put("/kanbanapi/create");
