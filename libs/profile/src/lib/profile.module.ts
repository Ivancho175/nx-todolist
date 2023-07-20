import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { profileRoutes } from './lib.routes';
import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(profileRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [ProfileComponent],
})
export class ProfileModule {}
