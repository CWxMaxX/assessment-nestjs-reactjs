import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.usersService.create(createUserDto);
  }

  @Post("update-status")
  async updateStatus(@Body() updateStatusDto: { id: number; status: "Active" | "Deactivated" }) {
    return this.usersService.updateStatus(updateStatusDto.id, updateStatusDto.status);
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get("active")
  async findActiveUsers() {
    return this.usersService.findActiveUsers();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: Prisma.UserUpdateInput) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
