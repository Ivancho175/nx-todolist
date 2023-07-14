import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

import { Task } from '@nx-todolist/tasks/task.entity';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  last_name!: string;

  @Prop({ required: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ required: true })
  role!: 'ADMIN' | 'USER';

  @Prop({ type: [{ type: Types.ObjectId, ref: Task.name }] })
  tasks?: Types.Array<Task>;
}

export const UserSchema = SchemaFactory.createForClass(User);
