import { Controller, Get, UseGuards } from '@nestjs/common';

import { AppService } from './app.service';
import { ApiKeyGuard } from '@nx-todolist/auth/api-key.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(ApiKeyGuard)
  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('testTasks')
  getMockTasks() {
    return this.appService.getTasks();
  }
}
