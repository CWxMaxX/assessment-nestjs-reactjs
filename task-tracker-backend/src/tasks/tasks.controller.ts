import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Prisma } from "@prisma/client";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: Prisma.TaskCreateInput) {
    return this.tasksService.create(createTaskDto);
  }

  @Post("update-status")
  async updateStatus(@Body() body) {
    const {id, status} = body
    return this.tasksService.updateStatus(+id, status); 
  }

  @Get()
  async findAll() {
    return this.tasksService.findAll();
  }

  @Get("with-assignee/:id")
  async findAllWithAssignee(@Param("id") id: string) {
    return this.tasksService.findAllWithAssignee(+id);
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateTaskDto: Prisma.TaskUpdateInput) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.tasksService.remove(+id);
  }
}
