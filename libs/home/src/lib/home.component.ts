import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { CoreService } from '@nx-todolist/frontend/core.service';
import { AuthService } from '@nx-todolist/frontend/auth.service';
import { TokenService } from '@nx-todolist/frontend/token.service';
import { CreateUser } from '@nx-todolist/users/user.dto';

@Component({
  selector: 'nx-todolist-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  public loging = true;

  loginForm: FormGroup;
  registerForm: FormGroup;

  @ViewChild('loginFormRef') loginFormRef!: FormGroupDirective;
  @ViewChild('registerFormRef') registerFormRef!: FormGroupDirective;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private coreService: CoreService,
    private authService: AuthService,
    private tokenService: TokenService
  ) {
    this.loginForm = this.formBuilder.group({
      login_email: new FormControl('', [
        Validators.pattern(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/
        ),
        Validators.required,
      ]),
      login_password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });

    this.registerForm = this.formBuilder.group({
      register_name: new FormControl('', [Validators.required]),
      register_last_name: new FormControl('', [Validators.required]),
      register_email: new FormControl('', [
        Validators.pattern(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/
        ),
        Validators.required,
      ]),
      register_password: new FormControl('', [Validators.required]),
    });
  }

  public sendLoginForm(form: FormGroup) {
    if (form.valid) {
      const value = form.value;
      const data = {
        email: value.login_email,
        password: value.login_password,
      };
      this.authService.loginUser(data).then((res: any) => {
        if (res.access_token) {
          this.tokenService.setAccessToken(res.access_token);
          this.router.navigate(['/dashboard']);
        }
      });
    }
  }

  public sendRegisterForm(form: FormGroup) {
    if (form.valid) {
      const value = form.value;
      const newUser: CreateUser = {
        name: value.register_name,
        last_name: value.register_last_name,
        email: value.register_email,
        password: value.register_password,
        role: 'USER',
        tasks: [],
      };
      this.coreService.postUser(newUser).then((res: any) => {
        if (res.user) {
          const loginData = {
            email: res.user.email,
            password: value.register_password,
          };
          this.authService.loginUser(loginData).then((res: any) => {
            if (res.access_token) {
              this.tokenService.setAccessToken(res.access_token);
              this.router.navigate(['/dashboard']);
            }
          });
        }
      });
    }
  }

  public goToRegister() {
    this.loging = false;
    this.loginForm.reset();
    this.loginFormRef.resetForm();
  }

  public goToLogin() {
    this.loging = true;
    this.registerForm.reset();
    this.registerFormRef.resetForm();
  }
}
