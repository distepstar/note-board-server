import { KanbanService } from "../../services/Kanban";
import { IKanbanData } from "../../models/Kanban";
import { Response, Request, NextFunction } from "express";
import { IResponse } from "../../consts/Kanban/interfaces";



export class Kanban {
  static kanbanDataDummy: IKanbanData[] = [
    {
      creator: "Louis",
      assignedTo: "",
      title: "Initialize Data",
      desc: "Testing for data init",
      issuedDate: new Date("01-24-2023"),
      section: "TO DO",
      comment: "N/A",
    },
    {
      creator: "Louis",
      assignedTo: "",
      title: "Initialize Data",
      desc: "Testing for data init",
      issuedDate: new Date("01-24-2023"),
      section: "TO DO",
      comment: "N/A",
    },
    {
      creator: "Louis",
      assignedTo: "",
      title: "Initialize Data",
      desc: "Testing for data init",
      issuedDate: new Date("01-24-2023"),
      section: "TO DO",
      comment: "N/A",
    },
    {
      creator: "Louis",
      assignedTo: "",
      title: "Initialize Data",
      desc: "Testing for data init",
      issuedDate: new Date("01-24-2023"),
      section: "TO DO",
      comment: "N/A",
    },
    {
      creator: "Louis",
      assignedTo: "",
      title: "Initialize Data",
      desc: "Testing for data init",
      issuedDate: new Date("01-24-2023"),
      section: "REVIEW",
      comment: "N/A",
    },
    {
      creator: "Louis",
      assignedTo: "",
      title: "Initialize Data",
      desc: "Testing for data init",
      issuedDate: new Date("01-24-2023"),
      section: "REVIEW",
      comment: "N/A",
    },
    {
      creator: "Louis",
      assignedTo: "",
      title: "Initialize Data",
      desc: "Testing for data init",
      issuedDate: new Date("01-24-2023"),
      section: "IN PROGRESS",
      comment: "N/A",
    },
    {
      creator: "Louis",
      assignedTo: "",
      title: "Initialize Data",
      desc: "Testing for data init",
      issuedDate: new Date("01-24-2023"),
      section: "IN PROGRESS",
      comment: "N/A",
    },
    {
      creator: "Louis",
      assignedTo: "",
      title: "Initialize Data",
      desc: "Testing for data init",
      issuedDate: new Date("01-24-2023"),
      section: "IN PROGRESS",
      comment: "N/A",
    },
    {
      creator: "Louis",
      assignedTo: "",
      title: "Initialize Data",
      desc: "Testing for data init",
      issuedDate: new Date("01-24-2023"),
      section: "IN PROGRESS",
      comment: "N/A",
    },
    {
      creator: "Louis",
      assignedTo: "",
      title: "Initialize Data",
      desc: "Testing for data init",
      issuedDate: new Date("01-24-2023"),
      section: "IN PROGRESS",
      comment: "N/A",
    },
    {
      creator: "Louis",
      assignedTo: "",
      title: "Initialize Data",
      desc: "Testing for data init",
      issuedDate: new Date("01-24-2023"),
      section: "DONE",
      comment: "N/A",
    },
    {
      creator: "Louis",
      assignedTo: "",
      title: "Initialize Data",
      desc: "Testing for data init",
      issuedDate: new Date("01-24-2023"),
      section: "DONE",
      comment: "N/A",
    },
    {
      creator: "Louis",
      assignedTo: "",
      title: "Initialize Data",
      desc: "Testing for data init",
      issuedDate: new Date("01-24-2023"),
      section: "DONE",
      comment: "N/A",
    },
    {
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
    await KanbanService.dropCollectionOnStart(KanbanService.addToCollection, Kanban.kanbanDataDummy);
  }

  static async getAllKanbanData(req: Request, res: Response) {
    let doc = await KanbanService.getAllKanbanData();
    !doc && res.status(404).json("There is no kanban data!");
    res.json(doc);
  }

  static async getKanbanDataById(req: Request, res: Response) {
    let id = req.params.id;
    const kanbanData = await KanbanService.getKanbanDataById(id);
    res.json(kanbanData);
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
