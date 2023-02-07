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
exports.KanbanService = void 0;
const Kanban_1 = require("../../models/Kanban");
const KanbanProject_1 = require("../../models/KanbanProject");
class KanbanService {
    // KanbanProject service
    static dropKanbanProjectCollectionOnStart(callback, arr) {
        return __awaiter(this, void 0, void 0, function* () {
            yield KanbanProject_1.KanbanProjectModel.deleteMany({}).catch(err => console.error(err));
            yield callback(arr);
        });
    }
    static addKanbanProjectToCollection(arr) {
        return __awaiter(this, void 0, void 0, function* () {
            arr.map((el) => __awaiter(this, void 0, void 0, function* () {
                let temp = new KanbanProject_1.KanbanProjectModel(el);
                yield temp.save().catch(err => console.error(err));
                console.log(temp.id);
            }));
        });
    }
    static getAllKanbanProject() {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield KanbanProject_1.KanbanProjectModel.find({}).catch(err => console.error(err));
            return doc;
        });
    }
    // kanban data service
    static addKanbanDataToCollection(arr) {
        return __awaiter(this, void 0, void 0, function* () {
            arr.map((el) => __awaiter(this, void 0, void 0, function* () {
                let temp = new Kanban_1.KanbanData(el);
                yield temp.save();
                console.log(temp.section);
            }));
        });
    }
    static dropKanbanCollectionOnStart(callback, arr) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Kanban_1.KanbanData.deleteMany({}).catch(err => console.error(err));
            yield callback(arr);
        });
    }
    static getAllKanbanData() {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield Kanban_1.KanbanData.find({}).catch(err => console.error(err));
            return doc;
        });
    }
    static getKanbanDataByProjectId(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const kanbanDataByProjectId = yield Kanban_1.KanbanData.aggregate([{ $match: { projectId: projectId } }]);
            return kanbanDataByProjectId;
        });
    }
    static getKanbanDataById(dataId) {
        return __awaiter(this, void 0, void 0, function* () {
            const kanbanDataById = yield Kanban_1.KanbanData.findById({ _id: dataId });
            return kanbanDataById;
        });
    }
    static updateKanbanDataById(dataId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`JSON ${body}`);
            // parse json from body to KanbanData
            let response = { status: 400, message: "Default message" };
            const parsedBody = JSON.parse(body);
            yield Kanban_1.KanbanData.updateOne({ _id: dataId }, parsedBody)
                .then((result) => {
                // same as response.ok
                if (result.acknowledged) {
                    response = {
                        status: 200,
                        message: `Update kanban data Id: ${dataId} success!`
                    };
                }
            })
                .catch(err => {
                response = {
                    status: 400,
                    message: `Failed to update kanban data Id: ${dataId}`,
                    error: err,
                };
            });
            return response;
        });
    }
}
exports.KanbanService = KanbanService;
