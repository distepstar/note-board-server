"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KanbanData = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const { Schema } = mongoose_1.default;
const counterSchema = new Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 },
});
const counter = (0, mongoose_1.model)('counter', counterSchema);
const kanbanDataSchema = new Schema({
    creator: { type: String, required: true },
    assignedTo: { type: String, required: false },
    title: { type: String, required: true },
    desc: { type: String, required: false },
    issuedDate: { type: Date, required: true },
    dueDate: { type: Date, required: false },
    section: { type: String, required: true },
    comment: { type: String, required: false },
});
// kanbanDataSchema.pre('save', function (next){
//   let el = this;
//   counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: {seq: 1}}, function(error, counter){
//     if(error){
//       return next(error);
//     }
//     el.id = counter!.seq;
//     next();
//   })
// })
exports.KanbanData = (0, mongoose_1.model)('KanbanData', kanbanDataSchema);
