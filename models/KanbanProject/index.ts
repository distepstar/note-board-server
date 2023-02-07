import { model, Schema } from "mongoose";

// interface
export interface IKanbanProject {
  projectId: string;
  name: string;
  establisher: string;
  establishDate: Date;
  status: string;
}

// schema
const kanbanProjectSchema = new Schema<IKanbanProject>({
  projectId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  establisher: { type: String, required: true },
  establishDate: { type: Date, required: true },
  status: { type: String, required: true },
})

// model
export const KanbanProjectModel = model<IKanbanProject>('KanbanProjectModel', kanbanProjectSchema);
