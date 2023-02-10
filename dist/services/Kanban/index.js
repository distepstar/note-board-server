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
const Kanban_1 = require("../../models/Kanban");
const addKanbanDataToCollection = (arr) => __awaiter(void 0, void 0, void 0, function* () {
    arr.map((el) => __awaiter(void 0, void 0, void 0, function* () {
        let temp = new Kanban_1.KanbanData(el);
        yield temp.save();
        console.log(temp.section);
    }));
});
const dropKanbanCollectionOnStart = (callback, arr) => __awaiter(void 0, void 0, void 0, function* () {
    yield Kanban_1.KanbanData.deleteMany({}).catch(err => console.error(err));
    yield callback(arr);
});
const getAllKanbanData = () => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield Kanban_1.KanbanData.find({}).catch(err => console.error(err));
    return doc;
});
const getKanbanDataByProjectId = (projectId) => __awaiter(void 0, void 0, void 0, function* () {
    const kanbanDataByProjectId = yield Kanban_1.KanbanData.aggregate([{ $match: { projectId: projectId } }]);
    return kanbanDataByProjectId;
});
const getKanbanDataById = (dataId) => __awaiter(void 0, void 0, void 0, function* () {
    const kanbanDataById = yield Kanban_1.KanbanData.findById({ _id: dataId });
    return kanbanDataById;
});
const createKanbanData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const temp = JSON.parse(data);
    let response = { status: 400, message: "Default message" };
    yield new Kanban_1.KanbanData(temp).save().then((res) => {
        console.log("create success");
        if (res) {
            response = {
                status: 200,
                message: `Create kanban data with Id: ${res._id} success!`,
            };
        }
    })
        .catch(err => {
        response = {
            status: 400,
            message: `Failed to create a new kanban data!`,
            error: err,
        };
    });
    return response;
});
const updateKanbanDataById = (dataId, body) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`JSON ${body}`);
    // parse json from body to KanbanData
    let response = { status: 400, message: "Default message" };
    const parsedBody = JSON.parse(body);
    yield Kanban_1.KanbanData.updateOne({ _id: dataId }, parsedBody)
        .then((res) => {
        // same as response.ok
        if (res.acknowledged) {
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
const KanbanService = {
    // kanban data service
    addKanbanDataToCollection,
    dropKanbanCollectionOnStart,
    getAllKanbanData,
    getKanbanDataByProjectId,
    getKanbanDataById,
    createKanbanData,
    updateKanbanDataById,
};
exports.default = KanbanService;
