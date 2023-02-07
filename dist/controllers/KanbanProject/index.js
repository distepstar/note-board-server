"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KanbanProject = void 0;
const Kanban_1 = require("../../services/Kanban");
class KanbanProject {
    static initialKanbanProjectOnStart() {
        return __awaiter(this, void 0, void 0, function* () {
            yield Kanban_1.KanbanService.dropKanbanProjectCollectionOnStart(Kanban_1.KanbanService.addKanbanProjectToCollection, this.kanbanProjects);
        });
    }
    static getAllKanbanProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const temp = yield Kanban_1.KanbanService.getAllKanbanProject();
            !temp && res.status(200).json({ status: 200, message: "Kanban board has no project, please create one!" });
            res.json(temp);
        });
    }
}
exports.KanbanProject = KanbanProject;
KanbanProject.kanbanProjects = [
    {
        projectId: "project-1",
        name: "Project 1",
        establisher: "Louis",
        establishDate: new Date(),
        status: "New",
    },
    {
        projectId: "project-2",
        name: "Project 2",
        establisher: "Louis",
        establishDate: new Date(),
        status: "New",
    },
    {
        projectId: "project-3",
        name: "Project 3",
        establisher: "Louis",
        establishDate: new Date(),
        status: "New",
    },
    {
        projectId: "project-4",
        name: "Project 4",
        establisher: "Louis",
        establishDate: new Date(),
        status: "New",
    },
];
