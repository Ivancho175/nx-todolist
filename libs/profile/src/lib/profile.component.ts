import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CoreService } from '@nx-todolist/frontend/core.service';
import { TokenService } from '@nx-todolist/frontend/token.service';
import { UpdateUser } from '@nx-todolist/users/user.dto';
import { User } from '@nx-todolist/users/user.entity';
import { Observable } from 'rxjs';

@Component({
  selector: 'nx-todolist-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  public loading = true;
  public removeProfileConfirmation = false;
  public editUserForm: FormGroup;
  public profile!:
    | Observable<any | { message: string; data: User }>
    | undefined;

  @ViewChild('editUserFormRef') editUserFormRef!: FormGroupDirective;

  constructor(
    private formBuilder: FormBuilder,
    private coreService: CoreService,
    private tokenService: TokenService,
    private ref: ChangeDetectorRef,
    private router: Router
  ) {
    this.editUserForm = this.formBuilder.group({
      profile_name: new FormControl(''),
      profile_last_name: new FormControl(''),
      profile_email: new FormControl('', [
        Validators.pattern(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/
        ),
      ]),
      profile_password: new FormControl(''),
    });
    setTimeout(() => {
      this.profile = this.coreService.getProfile();
      this.loading = false;
      this.ref.markForCheck();
    }, 1000);
  }

  public async sendEditUserForm(form: FormGroup) {
    if (form.valid) {
      const value = form.value;
      let payload: UpdateUser = {};
      value.profile_name
        ? (payload = { ...payload, name: value.profile_name })
        : payload;
      value.profile_last_name
        ? (payload = { ...payload, last_name: value.profile_last_name })
        : payload;
      value.profile_email
        ? (payload = { ...payload, email: value.profile_email })
        : payload;
      value.profile_password
        ? (payload = { ...payload, password: value.profile_password })
        : payload;
      await this.coreService.updateUser(payload);
      this.editUserForm.reset();
      this.editUserFormRef.resetForm();
      this.getProfile();
      this.ref.markForCheck();
    }
  }

  private getProfile() {
    this.profile = this.coreService.getProfile();
  }

  public async removeAccount() {
    await this.coreService.deleteProfile().then((res) => {
      try {
        console.log(res);
        this.router.navigate(['home']).then(() => {
          /* this.tokenService.setAccessToken(''); */
        });
      } catch (error) {
        console.log(error);
      }
    });
  }

  public removeProfileConfirmationDialog(event: Event) {
    const element = event.target as HTMLElement;
    if (element.tagName === 'DIALOG') {
      this.removeProfileConfirmation = false;
    }
  }
}
