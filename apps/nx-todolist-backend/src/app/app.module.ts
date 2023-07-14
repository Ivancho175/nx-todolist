import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '@nx-todolist/users';
import { TasksModule } from '@nx-todolist/tasks';
import { SharedModule } from '@nx-todolist/shared';
import config from '@nx-todolist/config';
import { AuthModule } from '@nx-todolist/auth';
/* import { environments } from './environments'; */

@Module({
  imports: [
    UsersModule,
    TasksModule,
    AuthModule,
    SharedModule,
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
