import { IKanbanProject, KanbanProjectModel } from "../../models/KanbanProject";

// KanbanProject service
const dropKanbanProjectCollectionOnStart = async (callback: (arr: IKanbanProject[]) => Promise<void>, arr: IKanbanProject[]) => {
  await KanbanProjectModel.deleteMany({}).catch(err => console.error(err));
  await callback(arr);
}

const addKanbanProjectToCollection = async (arr: IKanbanProject[]) => {
  arr.map(async (el) => {
    let temp = new KanbanProjectModel(el);
    await temp.save().catch(err => console.error(err));
    console.log(temp.id);
  })
}

const getAllKanbanProject = async (): Promise<IKanbanProject[] | undefined> => {
  const doc = await KanbanProjectModel.find({}).catch(err => console.error(err));
  return doc as IKanbanProject[];
}

const KanbanProjectService = {
  dropKanbanProjectCollectionOnStart,
  addKanbanProjectToCollection,
  getAllKanbanProject
}


export default KanbanProjectService;
