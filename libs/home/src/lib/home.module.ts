import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, HomeRoutingModule, FormsModule, ReactiveFormsModule],
  declarations: [HomeComponent],
  exports: [HomeComponent],
})
export class HomeModule {}
