import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LoginStudentDto {
   @ApiProperty({ description: 'Registered Student email', example: 'example@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ description: 'Registered Student password', example: '12345sdfjgnsnfjASDASD!' })
  @IsString()
  @IsNotEmpty()
  password!: string;
}