import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Task extends Document {
  @Prop({ required: true })
  name!: string;

  @Prop()
  description?: string;

  @Prop({ type: Boolean, required: true, default: false })
  completed!: boolean;

  @Prop({ type: Date, required: true })
  created_at!: Date;

  @Prop({ type: Date })
  modified_at?: Date;

  @Prop({ type: Date })
  limit_date?: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
