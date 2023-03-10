import { Request, Response } from "express"
import { IKanbanProject } from "../../models/KanbanProject";
import KanbanProjectService from "../../services/KanbanProject"



export class KanbanProject {
  static kanbanProjects: IKanbanProject[] = [
    {
      projectId: "project-1",
      name: "Project 1",
      establisher: "Louis",
      establishDate: new Date(),
      status: "New",
    },
    {
      projectId: "project-2",
      name: "Project 2",
      establisher: "Louis",
      establishDate: new Date(),
      status: "New",
    },
    {
      projectId: "project-3",
      name: "Project 3",
      establisher: "Louis",
      establishDate: new Date(),
      status: "New",
    },
    {
      projectId: "project-4",
      name: "Project 4",
      establisher: "Louis",
      establishDate: new Date(),
      status: "New",
    },
  ];

  static async initialKanbanProjectOnStart() {
    await KanbanProjectService.dropKanbanProjectCollectionOnStart(KanbanProjectService.addKanbanProjectToCollection, this.kanbanProjects);
  }

  static async getAllKanbanProject(req: Request, res: Response) {
    const temp = await KanbanProjectService.getAllKanbanProject();
    !temp && res.status(200).json({ status: 200, message: "Kanban board has no project, please create one!" });
    res.json(temp);
  }
}
