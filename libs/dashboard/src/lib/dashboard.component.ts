import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';

import { Observable } from 'rxjs';

import { CoreService } from '@nx-todolist/frontend/core.service';
import { User } from '@nx-todolist/users/user.entity';
import { CreateTask, UpdateTask } from '@nx-todolist/tasks/tasks.dto';
import { Task } from '@nx-todolist/tasks/task.entity';

@Component({
  selector: 'nx-todolist-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  public createForm: FormGroup;
  public editForm: FormGroup;
  public creating = false;
  public editing = false;
  public loading = true;

  public profile!:
    | Observable<any | { message: string; data: User }>
    | undefined;

  @ViewChild('createFormRef') createFormRef!: FormGroupDirective;
  @ViewChild('editFormRef') editFormRef!: FormGroupDirective;

  constructor(
    private formBuilder: FormBuilder,
    private coreService: CoreService,
    private ref: ChangeDetectorRef
  ) {
    this.createForm = this.formBuilder.group({
      create_task_name: new FormControl('', [Validators.required]),
      create_task_description: new FormControl(''),
      create_task_limit_date: new FormControl(''),
    });

    this.editForm = this.formBuilder.group({
      edit_task_name: new FormControl('', [Validators.required]),
      edit_task_description: new FormControl(''),
      edit_task_limit_date: new FormControl(''),
    });

    setTimeout(() => {
      this.profile = this.coreService.getProfile();
      this.loading = false;
      this.ref.markForCheck();
    }, 1000);
  }

  public async sendCreateForm(form: FormGroup) {
    if (form.valid) {
      const value = form.value;
      const newTask: CreateTask = {
        name: value.create_task_name,
        description: value.create_task_description
          ? value.create_task_description
          : undefined,
        completed: false,
        created_at: new Date(Date.now()),
        limit_date: value.create_task_limit_date
          ? new Date(value.create_task_limit_date)
          : undefined,
      };
      await this.coreService.createTask(newTask);
      this.creating = false;
      this.getProfile();
      this.createForm.reset();
      this.createFormRef ? this.createFormRef.resetForm() : null;
      this.ref.markForCheck();
    }
  }

  public async sendEditForm(form: FormGroup) {
    const taskId = localStorage.getItem('editingTaskId');
    if (form.valid && taskId) {
      const value = form.value;
      const payload: UpdateTask = {
        name: value.edit_task_name,
        description: value.edit_task_description
          ? value.edit_task_description
          : undefined,
        limit_date: value.edit_task_limit_date
          ? value.edit_task_limit_date
          : undefined,
        modified_at: new Date(Date.now()),
      };
      await this.coreService.updateTask(payload, taskId);
      this.editing = false;
      this.getProfile();
      localStorage.removeItem('editingTaskId');
      this.editForm.reset();
      this.editFormRef ? this.editFormRef.resetForm() : null;
      this.ref.markForCheck();
    }
  }

  public editTask(event: Event, task: Task) {
    event.preventDefault();
    localStorage.setItem('editingTaskId', task._id);
    const date = task.limit_date?.toString().split('T')[0];
    this.editForm.get('edit_task_name')?.setValue(task.name);
    this.editForm.get('edit_task_description')?.setValue(task.description);
    this.editForm.get('edit_task_limit_date')?.setValue(date);
    this.editing = true;
  }

  public checkIfDialog(event: Event) {
    const element = event.target as HTMLElement;
    if (element.tagName === 'DIALOG') {
      this.closeTaskCard();
    }
  }

  public closeTaskCard() {
    this.editForm.reset();
    this.editFormRef ? this.editFormRef.resetForm() : null;
    this.createForm.reset();
    this.createFormRef ? this.createFormRef.resetForm() : null;
    this.editing = false;
    this.creating = false;
  }

  public async deleteTask(event: Event, taskId: string) {
    event.preventDefault();
    await this.coreService.deleteTask(taskId);
    this.getProfile();
    this.ref.markForCheck();
  }

  private getProfile() {
    this.profile = this.coreService.getProfile();
  }

  public formatDate(date: Date) {
    return date.toString().split('T')[0].split('-').reverse().join('-');
  }
}
