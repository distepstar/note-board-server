"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KanbanProjectModel = void 0;
const mongoose_1 = require("mongoose");
// schema
const kanbanProjectSchema = new mongoose_1.Schema({
    projectId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    establisher: { type: String, required: true },
    establishDate: { type: Date, required: true },
    status: { type: String, required: true },
});
// model
exports.KanbanProjectModel = (0, mongoose_1.model)('KanbanProjectModel', kanbanProjectSchema);
