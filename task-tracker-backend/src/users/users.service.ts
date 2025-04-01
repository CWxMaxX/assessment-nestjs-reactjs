import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { DatabaseService } from "src/database/database.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async encryptPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async create(createUserDto: Prisma.UserCreateInput) {
    if (createUserDto.password) {
      createUserDto.password = await this.encryptPassword(createUserDto.password);
    }
    return this.databaseService.user.create({
      data: createUserDto,
    });
  }

  async findAll() {
    return this.databaseService.user.findMany();
  }

  async findActiveUsers() {
    return await this.databaseService.user.findMany({
      where:{ status : "Active"}
    })
    
  }

  async findOne(id: number) {
    return this.databaseService.user.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    return this.databaseService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.user.delete({
      where: { id },
    });
  }
  async updateStatus(id: number, status: "Active" | "Deactivated") {
    return this.databaseService.user.update({
      where: { id },
      data: { status },
    });
  }
}
