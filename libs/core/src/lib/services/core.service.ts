import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, switchMap } from 'rxjs';

import { CreateUser, UpdateUser } from '@nx-todolist/users/user.dto';
import { Task } from '@nx-todolist/tasks/task.entity';
import { CreateTask, UpdateTask } from '@nx-todolist/tasks/tasks.dto';

const apiUrl = process.env['NX_API_URL'];

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  constructor(private http: HttpClient) {}

  public async getUsers() {
    const response = this.http.get(apiUrl + '/users');
    return lastValueFrom(response);
  }

  public async postUser(payload: CreateUser) {
    const response = this.http.post(apiUrl + '/users', payload);
    return lastValueFrom(response);
  }

  public async updateUser(payload: UpdateUser) {
    const response = this.http.put(apiUrl + '/profile', payload);
    return lastValueFrom(response);
  }

  public async createTask(payload: CreateTask) {
    const response = this.http
      .post(apiUrl + '/tasks', payload)
      .pipe(
        switchMap((res: any | { message: string; task: Task }) =>
          this.addTaskToUser(res.task._id)
        )
      );
    return lastValueFrom(response);
  }

  private async addTaskToUser(taskId: string) {
    const payload = {
      tasksIds: [taskId],
    };
    const response = this.http.put(apiUrl + '/profile/tasks', payload);
    return lastValueFrom(response);
  }

  public async updateTask(payload: UpdateTask, taskId: string) {
    const response = this.http.put(apiUrl + '/tasks/' + taskId, payload);
    return lastValueFrom(response);
  }

  public async deleteTask(taskId: string) {
    const response = this.http.delete(apiUrl + '/tasks/' + taskId);
    return lastValueFrom(response);
  }

  public getProfile() {
    const response = this.http.get(apiUrl + '/profile');
    return response;
  }
}
