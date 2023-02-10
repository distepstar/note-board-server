import { UpdateResult } from "mongodb";
import { KanbanData, IKanbanData } from "../../models/Kanban";
import { IResponse } from "../../consts/Kanban/interfaces";

const addKanbanDataToCollection = async (arr: IKanbanData[]) => {
  arr.map(async (el) => {
    let temp = new KanbanData(el);
    await temp.save();
    console.log(temp.section);
  });
}

const dropKanbanCollectionOnStart = async (callback: (arr: IKanbanData[]) => Promise<void>, arr: IKanbanData[]) => {
  await KanbanData.deleteMany({}).catch(err => console.error(err));
  await callback(arr);
}

const getAllKanbanData = async (): Promise<IKanbanData[] | undefined> => {
  const doc = await KanbanData.find({}).catch(err => console.error(err));
  return doc as IKanbanData[];
}

const getKanbanDataByProjectId = async (projectId: string): Promise<IKanbanData[] | undefined> => {
  const kanbanDataByProjectId: IKanbanData[] = await KanbanData.aggregate([{ $match: { projectId: projectId } }]);
  return kanbanDataByProjectId as IKanbanData[];
}

const getKanbanDataById = async (dataId: string): Promise<IKanbanData | null | undefined> => {
  const kanbanDataById = await KanbanData.findById({ _id: dataId });
  return kanbanDataById;
}

const createKanbanData = async (data: string) => {
  const temp: IKanbanData = JSON.parse(data);
  let response: IResponse = { status: 400, message: "Default message" };

  await new KanbanData(temp).save().then(
    (res) => {
      console.log("create success");
      if (res) {
        response = {
          status: 200,
          message: `Create kanban data with Id: ${res._id} success!`,
        }
      }
    })
    .catch(err => {
      response = {
        status: 400,
        message: `Failed to create a new kanban data!`,
        error: err,
      }
    });
  return response;
}

const updateKanbanDataById = async (dataId: string, body: string) => {
  console.log(`JSON ${body}`);
  // parse json from body to KanbanData
  let response: IResponse = { status: 400, message: "Default message" };

  const parsedBody: IKanbanData = JSON.parse(body);
  await KanbanData.updateOne({ _id: dataId }, parsedBody)
    .then((res: UpdateResult) => {
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
}

const KanbanService = {
  // kanban data service
  addKanbanDataToCollection,
  dropKanbanCollectionOnStart,
  getAllKanbanData,
  getKanbanDataByProjectId,
  getKanbanDataById,
  createKanbanData,
  updateKanbanDataById,
}

export default KanbanService;

