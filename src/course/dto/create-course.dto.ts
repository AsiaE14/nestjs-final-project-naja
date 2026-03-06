import { IsString, IsNotEmpty, IsNumber, IsBoolean, Min, IsOptional } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  courseId!: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsOptional()
  description!: string;

  @IsNumber()
  @Min(1)
  credits!: number;

  @IsNumber()
  @Min(1)
  capacity!: number;

  @IsString()
  @IsNotEmpty()
  instructorName!: string;

  @IsBoolean()
  isElective!: boolean;
}