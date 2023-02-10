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
const KanbanProject_1 = require("../../models/KanbanProject");
// KanbanProject service
const dropKanbanProjectCollectionOnStart = (callback, arr) => __awaiter(void 0, void 0, void 0, function* () {
    yield KanbanProject_1.KanbanProjectModel.deleteMany({}).catch(err => console.error(err));
    yield callback(arr);
});
const addKanbanProjectToCollection = (arr) => __awaiter(void 0, void 0, void 0, function* () {
    arr.map((el) => __awaiter(void 0, void 0, void 0, function* () {
        let temp = new KanbanProject_1.KanbanProjectModel(el);
        yield temp.save().catch(err => console.error(err));
        console.log(temp.id);
    }));
});
const getAllKanbanProject = () => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield KanbanProject_1.KanbanProjectModel.find({}).catch(err => console.error(err));
    return doc;
});
const KanbanProjectService = {
    dropKanbanProjectCollectionOnStart,
    addKanbanProjectToCollection,
    getAllKanbanProject
};
exports.default = KanbanProjectService;
