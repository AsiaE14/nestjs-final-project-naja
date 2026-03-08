import { IsString, IsNotEmpty, IsNumber, IsBoolean, Min, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CourseStatus } from '../entities/course.entity';

export class CreateCourseDto {
  @ApiProperty({ description: 'Course code or ID (acts as Primary Key)', example: 'CS101' })
  @IsString()
  @IsNotEmpty()
  courseId!: string;

  @ApiProperty({ description: 'Course title', example: 'OOP Typescript' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ description: 'Course description (optional)', example: 'Learning about OOP programming with Typescript.' })
  @IsString()
  @IsOptional()
  description!: string;

  @ApiProperty({ description: 'Number of credits', example: 4 })
  @IsNumber()
  @Min(1)
  credits!: number;

  @ApiProperty({ description: 'Maximum student capacity', example: 40 })
  @IsNumber()
  @Min(1)
  capacity!: number;

  @ApiProperty({ description: 'Instructor name', example: 'Prof. Kanason jaransuk' })
  @IsString()
  @IsNotEmpty()
  instructorName!: string;

  @ApiProperty({ description: 'Elective course indicator (true = elective, false = core/mandatory)', example: true })
  @IsBoolean()
  isElective!: boolean;

  @ApiProperty({ description: 'Course availability status (true = OPEN, false = CLOSED)', example: 'OPEN' })
  @IsEnum(CourseStatus)
  @IsNotEmpty()
  status!: CourseStatus;
}