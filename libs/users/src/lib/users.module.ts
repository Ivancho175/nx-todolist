import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from './users.entity';
import { ProfileController } from './profile.controller';
import { TasksModule } from '@nx-todolist/tasks';

@Module({
  controllers: [UsersController, ProfileController],
  providers: [UsersService],
  imports: [
    TasksModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  exports: [UsersService],
})
export class UsersModule {}
