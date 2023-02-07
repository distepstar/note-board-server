import { UpdateResult } from "mongodb";
import { KanbanData, IKanbanData } from "../../models/Kanban";
import { IKanbanProject, KanbanProjectModel } from "../../models/KanbanProject";
import { IResponse } from "../../consts/Kanban/interfaces";

export class KanbanService {

  // KanbanProject service
  static async dropKanbanProjectCollectionOnStart(callback: (arr: IKanbanProject[]) => Promise<void>, arr: IKanbanProject[]) {
    await KanbanProjectModel.deleteMany({}).catch(err => console.error(err));
    await callback(arr);
  }

  static async addKanbanProjectToCollection(arr: IKanbanProject[]) {
    arr.map(async (el) => {
      let temp = new KanbanProjectModel(el);
      await temp.save().catch(err => console.error(err));
      console.log(temp.id);
    })
  }

  static async getAllKanbanProject(): Promise<IKanbanProject[] | undefined> {
    const doc = await KanbanProjectModel.find({}).catch(err => console.error(err));
    return doc as IKanbanProject[];
  }

  // kanban data service
  static async addKanbanDataToCollection(arr: IKanbanData[]) {
    arr.map(async (el) => {
      let temp = new KanbanData(el);
      await temp.save();
      console.log(temp.section);
    });
  }

  static async dropKanbanCollectionOnStart(callback: (arr: IKanbanData[]) => Promise<void>, arr: IKanbanData[]) {
    await KanbanData.deleteMany({}).catch(err => console.error(err));
    await callback(arr);
  }

  static async getAllKanbanData(): Promise<IKanbanData[] | undefined> {
    const doc = await KanbanData.find({}).catch(err => console.error(err));
    return doc as IKanbanData[];
  }

  static async getKanbanDataByProjectId(projectId: string): Promise<IKanbanData[] | undefined> {
    const kanbanDataByProjectId: IKanbanData[] = await KanbanData.aggregate([{ $match: { projectId: projectId } }]);
    return kanbanDataByProjectId as IKanbanData[];
  }

  static async getKanbanDataById(dataId: string): Promise<IKanbanData | null | undefined> {
    const kanbanDataById = await KanbanData.findById({ _id: dataId });
    return kanbanDataById;
  }

  static async updateKanbanDataById(dataId: string, body: string) {
    console.log(`JSON ${body}`);
    // parse json from body to KanbanData
    let response: IResponse = { status: 400, message: "Default message" };

    const parsedBody: IKanbanData = JSON.parse(body);
    await KanbanData.updateOne({ _id: dataId }, parsedBody)
      .then((result: UpdateResult) => {
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
  }
}

