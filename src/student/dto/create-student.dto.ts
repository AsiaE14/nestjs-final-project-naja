import { IsString, IsNotEmpty, IsEmail, IsBoolean, IsNumber, IsOptional, isNotEmpty } from 'class-validator';

export class Address {
    @IsString()
    @IsNotEmpty()
    houseNumber!: string;
    
    @IsString()
    @IsNotEmpty()
    street!: string;

    @IsString()
    @IsNotEmpty()
    province!: string;

    @IsString()
    @IsNotEmpty()
    postalCode!: string;
}

export class CreateStudentDto {
    @IsString()
    @IsNotEmpty()
    studentId!: string;

    @IsString()
    @IsNotEmpty()
    major!: string;

    @IsString()
    @IsNotEmpty()
    firstName!: string;

    @IsString()
    @IsNotEmpty()
    lastName!: string;

    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;

    @IsString()
    @IsNotEmpty()
    phone!: string;

    @IsString()
    @IsNotEmpty()
    status!: 'active' | 'inactive';

    @IsBoolean()
    @IsNotEmpty()
    isScholarship!: boolean;

    @IsNumber()
    @IsNotEmpty()
    maxCredit!: number;
}

