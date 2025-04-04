import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class TasksService {
  constructor(private readonly databaseService: DatabaseService) {}
  create(createTaskDto: Prisma.TaskCreateInput) {
    return this.databaseService.task.create({
      data: createTaskDto,
    });
  }

  findAll() {
    return this.databaseService.task.findMany();
  }

  findOne(id: number) {
    return this.databaseService.task.findUnique({
      where: { id },
    });
  }

  update(id: number, updateTaskDto: Prisma.TaskUpdateInput) {
    return this.databaseService.task.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  remove(id: number) {
    return this.databaseService.user.delete({
      where: { id },
    });
  }
  updateStatus(id: number, status: "done" | "todo") {
    return this.databaseService.task.update({
      where: { id },
      data: { status },
    });
  }
  findAllWithAssignee(assigneeId: number) {
    return this.databaseService.task.findMany({
      where: { assigneeId },
    });
  }
}
