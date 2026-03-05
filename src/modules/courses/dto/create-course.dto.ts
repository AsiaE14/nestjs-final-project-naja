import {
    IsString,
    IsNumber,
    IsNotEmpty,
    IsBoolean,
    IsEnum
} from 'class-validator'

import { ApiProperty } from '@nestjs/swagger';
import { CourseStatus } from '../enums/course-status.enum'

export class CreateCouseDto {
    @ApiProperty({ example: '0102345'})
    @IsString()
    @IsNotEmpty()
    courseCode!: string;

    @ApiProperty({ example: 'OOP Typescript'})
    @IsString()
    @IsNotEmpty()
    title!: string;

    @ApiProperty({ example: 'Learning about OOP programing with Typescript.'})
    @IsString()
    @IsNotEmpty()
    description!: string;

    @ApiProperty({ example: '23'})
    @IsNumber()
    @IsNotEmpty()
    credits!: number;

    @ApiProperty({ example: '40'})
    @IsNumber()
    @IsNotEmpty()
    capacity!: number;

    @ApiProperty({ example: '25' })
    @IsNumber()
    enrolledCount!: number;

    @ApiProperty({ enum: CourseStatus, example: CourseStatus.OPEN })
    @IsEnum({CourseStatus})
    status!: CourseStatus;

    @ApiProperty({ example: "Prof.Somsak"})
    @IsString()
    @IsNotEmpty()
    instructorName!: string;

    @ApiProperty({ example: true })
    @IsBoolean()
    isElective!: boolean;
}