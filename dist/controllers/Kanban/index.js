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
exports.Kanban = void 0;
const Kanban_1 = require("../../services/Kanban");
class Kanban {
    static initializeKanbanDataOnServerStart() {
        return __awaiter(this, void 0, void 0, function* () {
            // can change to Promise.all
            yield Kanban_1.KanbanService.dropKanbanCollectionOnStart(Kanban_1.KanbanService.addKanbanDataToCollection, Kanban.kanbanDataDummy);
        });
    }
    static getAllKanbanData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let doc = yield Kanban_1.KanbanService.getAllKanbanData();
            !doc && res.status(404).json("There is no kanban data!");
            res.json(doc);
        });
    }
    static getKanbanDataByProjectId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let temp = yield Kanban_1.KanbanService.getKanbanDataByProjectId(req.params.projectId);
            !temp && res.status(404).json("There is no kanban data!");
            res.json(temp);
        });
    }
    static getKanbanDataById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            const kanbanData = yield Kanban_1.KanbanService.getKanbanDataById(id);
            res.json(kanbanData);
        });
    }
    static updateKanbanDataById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id || null;
            if (id === null || id === undefined) {
                res.status(400).json("Id is not valid or empty!");
            }
            else {
                const updateResponse = yield Kanban_1.KanbanService.updateKanbanDataById(id, JSON.stringify(req.body));
                res.status(updateResponse.status).json({
                    message: updateResponse.message,
                    error: updateResponse.error
                });
            }
        });
    }
}
exports.Kanban = Kanban;
Kanban.kanbanDataDummy = [
    {
        projectId: "project-1",
        creator: "Louis",
        assignedTo: "",
        title: "Initialize Data",
        desc: "Testing for data init",
        issuedDate: new Date("01-24-2023"),
        section: "TO DO",
        comment: "N/A",
    },
    {
        projectId: "project-1",
        creator: "Louis",
        assignedTo: "",
        title: "Initialize Data",
        desc: "Testing for data init",
        issuedDate: new Date("01-24-2023"),
        section: "TO DO",
        comment: "N/A",
    },
    {
        projectId: "project-1",
        creator: "Louis",
        assignedTo: "",
        title: "Initialize Data",
        desc: "Testing for data init",
        issuedDate: new Date("01-24-2023"),
        section: "TO DO",
        comment: "N/A",
    },
    {
        projectId: "project-1",
        creator: "Louis",
        assignedTo: "",
        title: "Initialize Data",
        desc: "Testing for data init",
        issuedDate: new Date("01-24-2023"),
        section: "TO DO",
        comment: "N/A",
    },
    {
        projectId: "project-1",
        creator: "Louis",
        assignedTo: "",
        title: "Initialize Data",
        desc: "Testing for data init",
        issuedDate: new Date("01-24-2023"),
        section: "REVIEW",
        comment: "N/A",
    },
    {
        projectId: "project-1",
        creator: "Louis",
        assignedTo: "",
        title: "Initialize Data",
        desc: "Testing for data init",
        issuedDate: new Date("01-24-2023"),
        section: "REVIEW",
        comment: "N/A",
    },
    {
        projectId: "project-1",
        creator: "Louis",
        assignedTo: "",
        title: "Initialize Data",
        desc: "Testing for data init",
        issuedDate: new Date("01-24-2023"),
        section: "IN PROGRESS",
        comment: "N/A",
    },
    {
        projectId: "project-1",
        creator: "Louis",
        assignedTo: "",
        title: "Initialize Data",
        desc: "Testing for data init",
        issuedDate: new Date("01-24-2023"),
        section: "IN PROGRESS",
        comment: "N/A",
    },
    {
        projectId: "project-1",
        creator: "Louis",
        assignedTo: "",
        title: "Initialize Data",
        desc: "Testing for data init",
        issuedDate: new Date("01-24-2023"),
        section: "IN PROGRESS",
        comment: "N/A",
    },
    {
        projectId: "project-1",
        creator: "Louis",
        assignedTo: "",
        title: "Initialize Data",
        desc: "Testing for data init",
        issuedDate: new Date("01-24-2023"),
        section: "IN PROGRESS",
        comment: "N/A",
    },
    {
        projectId: "project-1",
        creator: "Louis",
        assignedTo: "",
        title: "Initialize Data",
        desc: "Testing for data init",
        issuedDate: new Date("01-24-2023"),
        section: "IN PROGRESS",
        comment: "N/A",
    },
    {
        projectId: "project-1",
        creator: "Louis",
        assignedTo: "",
        title: "Initialize Data",
        desc: "Testing for data init",
        issuedDate: new Date("01-24-2023"),
        section: "DONE",
        comment: "N/A",
    },
    {
        projectId: "project-1",
        creator: "Louis",
        assignedTo: "",
        title: "Initialize Data",
        desc: "Testing for data init",
        issuedDate: new Date("01-24-2023"),
        section: "DONE",
        comment: "N/A",
    },
    {
        projectId: "project-1",
        creator: "Louis",
        assignedTo: "",
        title: "Initialize Data",
        desc: "Testing for data init",
        issuedDate: new Date("01-24-2023"),
        section: "DONE",
        comment: "N/A",
    },
    {
        projectId: "project-1",
        creator: "Louis",
        assignedTo: "",
        title: "Initialize Data",
        desc: "Testing for data init",
        issuedDate: new Date("01-24-2023"),
        section: "DONE",
        comment: "N/A",
    },
];
