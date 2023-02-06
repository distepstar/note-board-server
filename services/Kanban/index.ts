import { UpdateResult } from "mongodb";
import { KanbanData, IKanbanData } from "../../models/Kanban";
import { IResponse } from "../../consts/Kanban/interfaces";

export class KanbanService {
  static async addToCollection(arr: IKanbanData[]) {
    console.log("in scope")
    arr.map(async (el) => {
      let temp = new KanbanData(el);
      await temp.save();
      console.log(temp.section);
    });
  }

  static async dropCollectionOnStart(callback: (arr: IKanbanData[]) => Promise<void>, arr: IKanbanData[]) {
    await KanbanData.deleteMany({}).catch(err => console.error(err));
    await callback(arr);
  }


  static async getAllKanbanData(): Promise<IKanbanData[] | undefined> {
    const doc = await KanbanData.find({}).catch(err => console.error(err));
    return doc as IKanbanData[];
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

