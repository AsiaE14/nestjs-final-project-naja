import {
    IsString,
    IsNotEmpty,
    IsEmail,
    IsNumber,
    IsPhoneNumber,
    IsArray,
    ValidateNested,
    IsEnum,
    IsBoolean
} from 'class-validator';

import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger';
import { AddressDto } from './address.dto'
import { StudentStatus } from '../enums/student-status.enum';

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

    @ApiProperty({example: "1234nut@example.com"})
    @IsEmail()
    email!: string;

    @ApiProperty({example: "0234235567"})
    @IsPhoneNumber()
    @IsNotEmpty()
    phone!: string;

    @ApiProperty({example: "123452"})
    @IsArray()
    @IsString({ each: true })
    registeredCourseIds!: string[];

    @ApiProperty({ type: () => AddressDto })
    @ValidateNested()
    @Type(() => AddressDto)
    @IsNotEmpty()
    address!: string;

    @ApiProperty({ enum: StudentStatus, example: StudentStatus.ACTIVE })
    @IsEnum(StudentStatus)
    status!: StudentStatus;

    @ApiProperty({ example: false })
    @IsBoolean()
    isScholarship!: boolean;

    @ApiProperty({ example: 22})
    @IsNumber()
    @IsNotEmpty()
    maxCredit!: number;
}