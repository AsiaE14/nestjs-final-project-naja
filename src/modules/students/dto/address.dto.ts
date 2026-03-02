import {
    IsString,
    IsNotEmpty,
    isNumberString,
    isNotEmpty,
    IsEmail,
    IsNumber,
    IsPhoneNumber
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
    @ApiProperty({example: '68012354'})
    @IsString()
    @IsNotEmpty()
    studentId!: string;

    @ApiProperty({example: "Computer Engineering"})
    @IsString()
    @IsNotEmpty()
    major!: string;

    @ApiProperty({example: "Nuthasit"})
    @IsString()
    @IsNotEmpty()
    firstName!: string;

    @ApiProperty({example: "Chauychoocherd"})
    @IsString()
    @IsNotEmpty()
    lastName!: string;

    @ApiProperty({example: "1234nut@gmail.com"})
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @ApiProperty({example: "0234235567"})
    @IsPhoneNumber()
    @IsNotEmpty()
    phone!: string;

    @ApiProperty({example: "123452"})
    @IsNumber()
    @IsNotEmpty()
    registeredCourseIds!: string;
}