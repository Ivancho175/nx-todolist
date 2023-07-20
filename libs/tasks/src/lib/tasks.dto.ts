import { Transform } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsPositive,
  Min,
  IsDate,
} from 'class-validator';

export class CreateTask {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  readonly name!: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly completed!: boolean;

  @IsDate()
  @IsNotEmpty()
  readonly created_at!: Date;

  @IsDate()
  @IsOptional()
  readonly limit_date?: Date;
}

export class UpdateTask {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsBoolean()
  @IsOptional()
  readonly completed?: boolean;

  @IsDate()
  readonly modified_at!: Date;

  @IsDate()
  @IsOptional()
  readonly limit_date?: Date;
}

export class FilterTasks {
  @IsNumber()
  @IsOptional()
  @IsPositive()
  limit?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  offset?: number;

  @Transform(({ obj, key }) => {
    return obj[key] === 'true' ? true : obj[key] === 'false' ? false : obj[key];
  })
  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}
