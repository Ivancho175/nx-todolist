import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import {
  AddTasksToUser,
  CreateUser,
  FilterUsers,
  UpdateUser,
} from './users.dto';
import { Public } from '@nx-todolist/shared/public.decorator';
import { JwtAuthGuard } from '@nx-todolist/shared/jwt-auth.guard';
import { Roles } from '@nx-todolist/shared/roles.decorator';
import { RolesGuard } from '@nx-todolist/shared/roles.guard';
import { Role } from '@nx-todolist/shared/roles.model';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Roles(Role.ADMIN)
  @Get()
  getAll(@Query() params?: FilterUsers) {
    return params ? this.usersService.get(params) : this.usersService.get();
  }

  @Roles(Role.ADMIN)
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.usersService.getById(id);
  }

  @Public()
  @Post()
  create(@Body() payload: CreateUser) {
    return this.usersService.create(payload);
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateUser) {
    return this.usersService.update(id, payload);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }

  @Roles(Role.ADMIN)
  @Put(':id/tasks')
  addTasks(@Param('id') id: string, @Body() payload: AddTasksToUser) {
    return this.usersService.addTasks(id, payload.tasksIds);
  }

  @Roles(Role.ADMIN)
  @Delete(':id/tasks/:taskId')
  deleteTask(@Param('id') userId: string, @Param('taskId') taskId: string) {
    return this.usersService.deleteTask(userId, taskId);
  }
}
