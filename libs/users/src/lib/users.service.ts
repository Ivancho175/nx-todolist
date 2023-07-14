import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { CreateUser, FilterUsers, UpdateUser } from './users.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async get(params?: FilterUsers) {
    if (params) {
      const { limit, offset } = params;
      const response = await this.userModel
        .find()
        .skip(offset ? offset : 0)
        .limit(limit ? limit : 20)
        .populate('tasks')
        .exec();
      const data: any[] = [];
      response.forEach((item) => {
        const { password, ...res } = item.toJSON();
        data.push(res);
      });
      return {
        message: 'Lista de usuarios',
        data,
      };
    }
    const data = await this.userModel.find().populate('tasks').exec();
    return {
      message: 'Lista de usuarios',
      data,
    };
  }

  async getById(id: string): Promise<any> {
    const user = await this.userModel.findById(id).populate('tasks').exec();
    if (!user) {
      throw new NotFoundException(
        'El usuario especificado no ha sido encontrado'
      );
    }
    const { password, ...data } = user.toJSON();
    return {
      message: 'Usuario solicitado',
      data,
    };
  }

  async getByEmail(email: string) {
    const user = await this.userModel
      .findOne({ email })
      .populate('tasks')
      .exec();
    if (!user) {
      throw new NotFoundException(
        'El usuario especificado no ha sido encontrado'
      );
    }
    return {
      message: 'Usuario solicitado',
      data: user,
    };
  }

  async create(payload: CreateUser): Promise<any> {
    const newUser = new this.userModel(payload);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;
    const saved = await newUser.save();
    const { password, ...res } = saved.toJSON();
    return {
      message: 'El usuario ha sido creado exitosamente',
      user: res,
    };
  }

  async update(id: string, payload: UpdateUser): Promise<any> {
    const user = await this.userModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .populate('tasks')
      .exec();
    if (!user) {
      throw new NotFoundException(
        'El usuario especificado no ha sido encontrado'
      );
    }
    const { password, ...data } = user.toJSON();
    return {
      message: 'El usuario ha sido modificado con éxito',
      data,
    };
  }

  async delete(id: string): Promise<any> {
    const user = await this.userModel.findByIdAndDelete(id).populate('tasks');
    if (!user) {
      throw new NotFoundException(
        'El usuario especificado no ha sido encontrado'
      );
    }
    const { password, ...data } = user.toJSON();
    return {
      message: 'El usuario ha sido eliminado con éxito',
      data,
    };
  }

  async addTasks(id: string, tasksIds: string[]): Promise<any> {
    const user = await this.userModel.findById(id).populate('tasks').exec();
    if (!user) {
      throw new NotFoundException(
        'El usuario especificado no ha sido encontrado'
      );
    }
    tasksIds.forEach((id) => user.tasks?.push(id));
    const res = await user.save();
    const { password, ...data } = res.toJSON();
    return {
      message: 'La tarea ha sido agregada exitosamente',
      data: await this.userModel.findById(id).populate('tasks').exec(),
    };
  }

  async deleteTask(id: string, taskId: string): Promise<any> {
    const user = await this.userModel.findById(id).populate('tasks').exec();
    if (!user) {
      throw new NotFoundException(
        'El usuario especificado no ha sido encontrado'
      );
    }
    user.tasks?.pull(taskId);
    const res = await user.save();
    const { password, ...data } = res.toJSON();
    return {
      message: 'La tarea ha sido eliminada con éxito',
      data,
    };
  }
}
