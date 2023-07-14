import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from '@nx-todolist/config';
import { Db } from 'mongodb';

@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @Inject('MONGO') private database: Db
  ) {}

  getData() {
    const data = {
      message: 'Bienvenido a tu api de tareas',
      api_key: this.configService.apiKey,
      db_name: this.configService.database.name,
      db_port: this.configService.database.port,
      environment: process.env.NODE_ENV,
    };
    return data;
    /* return { message: 'Bienvenido a tu api de tareas' }; */
  }

  getTasks() {
    const tasksCollection = this.database.collection('tasks');
    return tasksCollection.find().toArray();
  }
}
