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
import { TasksService } from './tasks.service';
import { CreateTask, FilterTasks, UpdateTask } from './tasks.dto';
import { ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from '@nx-todolist/mongo-id.pipe';
import { JwtAuthGuard } from '@nx-todolist/shared/jwt-auth.guard';
import { RolesGuard } from '@nx-todolist/shared/roles.guard';
import { Roles } from '@nx-todolist/shared/roles.decorator';
import { Role } from '@nx-todolist/shared/roles.model';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Roles(Role.ADMIN)
  @Get()
  getAll(@Query() params?: FilterTasks) {
    return params ? this.tasksService.get(params) : this.tasksService.get();
  }

  @Roles(Role.ADMIN)
  @Get(':id')
  getById(@Param('id', MongoIdPipe) id: string) {
    return this.tasksService.getById(id);
  }

  @Roles(Role.ADMIN || Role.USER)
  @Post()
  create(@Body() payload: CreateTask) {
    return this.tasksService.create(payload);
  }

  @Roles(Role.ADMIN || Role.USER)
  @Put(':id')
  update(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateTask) {
    return this.tasksService.update(id, payload);
  }

  @Roles(Role.ADMIN || Role.USER)
  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.tasksService.delete(id);
  }
}
