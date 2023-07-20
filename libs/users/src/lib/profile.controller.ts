import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@nx-todolist/shared/jwt-auth.guard';
import { Request } from 'express';

import { RolesGuard } from '@nx-todolist/shared/roles.guard';
import { UsersService } from './users.service';
import { Roles } from '@nx-todolist/shared/roles.decorator';
import { Role } from '@nx-todolist/shared/roles.model';
import { PayloadToken } from '@nx-todolist/shared/token.interface';
import { AddTasksToUser, UpdateUser } from './users.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private usersService: UsersService) {}

  @Roles([Role.USER, Role.ADMIN])
  @Get()
  getProfile(@Req() req: Request) {
    const user = req.user as PayloadToken;
    return this.usersService.getById(user.sub);
  }

  @Roles([Role.USER, Role.ADMIN])
  @Put()
  updateProfile(@Req() req: Request, @Body() payload: UpdateUser) {
    const user = req.user as PayloadToken;
    return this.usersService.update(user.sub, payload);
  }

  @Roles([Role.USER, Role.ADMIN])
  @Delete()
  deleteProfile(@Req() req: Request) {
    const user = req.user as PayloadToken;
    return this.usersService.delete(user.sub);
  }

  @Roles([Role.USER, Role.ADMIN])
  @Put('tasks')
  addTasks(@Req() req: Request, @Body() payload: AddTasksToUser) {
    const user = req.user as PayloadToken;
    return this.usersService.addTasks(user.sub, payload.tasksIds);
  }

  @Roles([Role.USER, Role.ADMIN])
  @Delete('tasks/:taskId')
  deleteTask(@Req() req: Request, @Param('taskId') taskId: string) {
    const user = req.user as PayloadToken;
    return this.usersService.deleteTask(user.sub, taskId);
  }
}
