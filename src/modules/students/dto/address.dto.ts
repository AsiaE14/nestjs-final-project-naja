import {
    IsString,
    IsNotEmpty,
    IsNumberString
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class AddressDto {
    @ApiProperty({ example: '123/23' })
    @IsString()
    @IsNotEmpty()
    houseNumber!: string;

    @ApiProperty({ example: 'Prasert Manukit 29' })
    @IsString()
    @IsNotEmpty()
    street!: string;

    @ApiProperty({ example: 'Bangkok' })
    @IsString()
    @IsNotEmpty()
    province!: string;

    @ApiProperty({ example: '10125' })
    @IsNumberString()
    @IsNotEmpty()
    postalcode!: string;
}