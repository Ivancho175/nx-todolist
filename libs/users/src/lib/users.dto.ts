import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsNumber,
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateUser {
  @IsString()
  @IsNotEmpty()
  readonly name!: string;

  @IsString()
  @IsNotEmpty()
  readonly last_name!: string;

  @IsString()
  @IsNotEmpty()
  readonly email!: string;

  @IsString()
  @IsNotEmpty()
  readonly password!: string;

  @IsString()
  @IsNotEmpty()
  readonly role!: 'ADMIN' | 'USER';

  @IsArray()
  @IsOptional()
  readonly tasks!: string[];
}

export class UpdateUser extends PartialType(CreateUser) {}

export class FilterUsers {
  @IsNumber()
  @IsOptional()
  @IsPositive()
  limit?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  offset?: number;
}

export class AddTasksToUser {
  @IsArray()
  @IsNotEmpty()
  readonly tasksIds!: string[];
}
