import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTask, FilterTasks, UpdateTask } from './tasks.dto';
import { Task } from './task.entity';
import { Db } from 'mongodb';

@Injectable()
export class TasksService {
  constructor(
    @Inject('MONGO') private database: Db,
    @InjectModel(Task.name) private taskModel: Model<Task>
  ) {}

  async get(params?: FilterTasks) {
    if (!params) {
      const data = await this.taskModel.find().exec();
      return {
        message: 'Lista de tareas',
        data: data,
      };
    }
    const filters: FilterQuery<Task> = {};
    const { limit, offset, completed } = params;
    if (completed === true || completed === false) {
      filters.completed = completed;
    }
    const data = await this.taskModel
      .find(filters)
      .skip(offset ? offset : 0)
      .limit(limit ? limit : 20)
      .exec();
    return {
      message: 'Lista de tareas',
      data,
    };
  }

  async getById(id: string) {
    const task = await this.taskModel.findById(id).exec();
    if (!task) {
      throw new NotFoundException(
        'La tarea especificada no ha sido encontrada'
      );
    }
    return {
      message: 'Tarea solicitada',
      data: task,
    };
  }

  async create(payload: CreateTask) {
    const newTask = new this.taskModel(payload);
    const res = await newTask.save();
    return {
      message: 'La tarea ha sido creada exitosamente',
      task: res,
    };
  }

  async update(id: string, payload: UpdateTask) {
    const task = await this.taskModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();
    if (!task) {
      throw new NotFoundException(
        'La tarea especificada no ha sido encontrada'
      );
    }
    return {
      message: 'La tarea ha sido modificada con éxito',
      data: task,
    };
  }

  async delete(id: string) {
    const task = await this.taskModel.findByIdAndDelete(id);
    if (!task) {
      throw new NotFoundException(
        'La tarea especificada no ha sido encontrada'
      );
    }
    return {
      message: 'La tarea ha sido eliminada con éxito',
      data: task,
    };
  }
}
