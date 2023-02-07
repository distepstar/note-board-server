"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KanbanData = void 0;
const mongoose_1 = require("mongoose");
const kanbanDataSchema = new mongoose_1.Schema({
    projectId: { type: String, required: true },
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
