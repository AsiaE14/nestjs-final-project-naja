import { IsString, IsNotEmpty, IsEmail, IsBoolean, IsNumber, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum StudentStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
}

export class CreateStudentDto {
    @ApiProperty({ description: '8-digit student ID', example: '68012354' })
    @IsString()
    @IsNotEmpty()
    studentId!: string;

    @ApiProperty({ description: "Student's major or field of study", example: 'Computer Engineering' })
    @IsString()
    @IsNotEmpty()
    major!: string;

    @ApiProperty({ description: 'First name', example: 'Somsak' })
    @IsString()
    @IsNotEmpty()
    firstName!: string;

    @ApiProperty({ description: 'Last name', example: 'Chaimogkon' })
    @IsString()
    @IsNotEmpty()
    lastName!: string;

    @ApiProperty({ description: 'Contact email address (must be unique)', example: 'example@example.com' })
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @ApiProperty({ description: 'Password for login', example: '12345sdfjgnsnfjASDASD!' })
    @IsString()
    @IsNotEmpty()
    password!: string;

    @ApiProperty({ description: 'Contact phone number', example: '0234235567' })
    @IsString()
    @IsNotEmpty()
    phone!: string;

    @ApiProperty({ description: 'Student enrollment status', enum: StudentStatus, example: StudentStatus.ACTIVE })
    @IsEnum(StudentStatus)
    @IsNotEmpty()
    status!: StudentStatus;

    @ApiProperty({ description: 'Scholarship status (true = has scholarship, false = regular student)', example: false })
    @IsBoolean()
    @IsNotEmpty()
    isScholarship!: boolean;

    @ApiProperty({ description: 'Maximum credits allowed for registration', example: 22 })
    @IsNumber()
    @IsNotEmpty()
    maxCredit!: number;


    address!: Address;
}

