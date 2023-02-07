import mongoose, { model, Schema } from "mongoose";
import { TKanbanSection } from "../../consts/Kanban/types";

export interface IKanbanData {
  projectId: string;
  creator: string;
  assignedTo?: string;
  title: string;
  desc?: string;
  issuedDate: Date;
  dueDate?: Date;
  section: TKanbanSection;
  comment?: string;
}

const kanbanDataSchema = new Schema<IKanbanData>({
  projectId: {type: String, required: true},
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


export const KanbanData = model<IKanbanData>('KanbanData', kanbanDataSchema);


