import { KanbanService } from "../../services/Kanban";
import { IKanbanData } from "../../models/Kanban";
import { Response, Request } from "express";
import { IResponse } from "../../consts/Kanban/interfaces";

export class Kanban {
  static kanbanDataDummy: IKanbanData[] = [
    {
      projectId: "project-1",
      creator: "Louis",
      assignedTo: "",
      title: "Initialize Data",
      desc: "Testing for data init",
      issuedDate: new Date("01-24-2023"),
      section: "TO DO",
      comment: "N/A",
    },
    {
      projectId: "project-1",
      creator: "Louis",
      assignedTo: "",
      title: "Initialize Data",
      desc: "Testing for data init",
      issuedDate: new Date("01-24-2023"),
      section: "TO DO",
      comment: "N/A",
    },
    {
      projectId: "project-1",
      creator: "Louis",
      assignedTo: "",
      title: "Initialize Data",
      desc: "Testing for data init",
      issuedDate: new Date("01-24-2023"),
      section: "TO DO",
      comment: "N/A",
    },
    {
      projectId: "project-1",
      creator: "Louis",
      assignedTo: "",
      title: "Initialize Data",
      desc: "Testing for data init",
      issuedDate: new Date("01-24-2023"),
      section: "TO DO",
      comment: "N/A",
    },
    {
      projectId: "project-1",
      creator: "Louis",
      assignedTo: "",
      title: "Initialize Data",
      desc: "Testing for data init",
      issuedDate: new Date("01-24-2023"),
      section: "REVIEW",
      comment: "N/A",
    },
    {
      projectId: "project-1",
      creator: "Louis",
      assignedTo: "",
      title: "Initialize Data",
      desc: "Testing for data init",
      issuedDate: new Date("01-24-2023"),
      section: "REVIEW",
      comment: "N/A",
    },
    {
      projectId: "project-1",
      creator: "Louis",
      assignedTo: "",
      title: "Initialize Data",
      desc: "Testing for data init",
      issuedDate: new Date("01-24-2023"),
      section: "IN PROGRESS",
      comment: "N/A",
    },
    {
      projectId: "project-1",
      creator: "Louis",
      assignedTo: "",
      title: "Initialize Data",
      desc: "Testing for data init",
      issuedDate: new Date("01-24-2023"),
      section: "IN PROGRESS",
      comment: "N/A",
    },
    {
      projectId: "project-1",
      creator: "Louis",
      assignedTo: "",
      title: "Initialize Data",
      desc: "Testing for data init",
      issuedDate: new Date("01-24-2023"),
      section: "IN PROGRESS",
      comment: "N/A",
    },
    {
      projectId: "project-1",
      creator: "Louis",
      assignedTo: "",
      title: "Initialize Data",
      desc: "Testing for data init",
      issuedDate: new Date("01-24-2023"),
      section: "IN PROGRESS",
      comment: "N/A",
    },
    {
      projectId: "project-1",
      creator: "Louis",
      assignedTo: "",
      title: "Initialize Data",
      desc: "Testing for data init",
      issuedDate: new Date("01-24-2023"),
      section: "IN PROGRESS",
      comment: "N/A",
    },
    {
      projectId: "project-1",
      creator: "Louis",
      assignedTo: "",
      title: "Initialize Data",
      desc: "Testing for data init",
      issuedDate: new Date("01-24-2023"),
      section: "DONE",
      comment: "N/A",
    },
    {
      projectId: "project-1",
      creator: "Louis",
      assignedTo: "",
      title: "Initialize Data",
      desc: "Testing for data init",
      issuedDate: new Date("01-24-2023"),
      section: "DONE",
      comment: "N/A",
    },
    {
      projectId: "project-1",
      creator: "Louis",
      assignedTo: "",
      title: "Initialize Data",
      desc: "Testing for data init",
      issuedDate: new Date("01-24-2023"),
      section: "DONE",
      comment: "N/A",
    },
    {
      projectId: "project-1",
      creator: "Louis",
      assignedTo: "",
      title: "Initialize Data",
      desc: "Testing for data init",
      issuedDate: new Date("01-24-2023"),
      section: "DONE",
      comment: "N/A",
    },
  ];
  static async initializeKanbanDataOnServerStart() {
    // can change to Promise.all
    await KanbanService.dropKanbanCollectionOnStart(KanbanService.addKanbanDataToCollection, Kanban.kanbanDataDummy);
  }

  static async getAllKanbanData(req: Request, res: Response) {
    let doc = await KanbanService.getAllKanbanData();
    !doc && res.status(404).json("There is no kanban data!");
    res.json(doc);
  }

  static async getKanbanDataByProjectId(req: Request, res: Response) {
    let temp = await KanbanService.getKanbanDataByProjectId(req.params.projectId);
    !temp && res.status(404).json("There is no kanban data!");
    res.json(temp);
  }

  static async getKanbanDataById(req: Request, res: Response) {
    let id = req.params.id;
    const kanbanData = await KanbanService.getKanbanDataById(id);
    res.json(kanbanData);
  }

  static async createKanbanData(req: Request, res: Response) {
    let data = req.body || null;

    if (data === null || data === undefined) {
      res.status(400).json("Kanban data is not valid or empty");
    } else {
      const createRes: IResponse = await KanbanService.createKanbanData(JSON.stringify(data));

      console.log(createRes);

      res.status(createRes.status).json({
        message: createRes.message,
        error: createRes.error
      });
    }
  }

  static async updateKanbanDataById(req: Request, res: Response) {
    const id = req.params.id || null
    if (id === null || id === undefined) {
      res.status(400).json("Id is not valid or empty!");
    } else {
      const updateResponse: IResponse = await KanbanService.updateKanbanDataById(id, JSON.stringify(req.body));

      res.status(updateResponse.status).json({
        message: updateResponse.message,
        error: updateResponse.error
      });
    }
  }
}
