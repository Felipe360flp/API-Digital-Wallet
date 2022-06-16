import { ApiProperty } from '@nestjs/swagger';
import { Category } from '@prisma/client';
import {IsNumber, IsString } from 'class-validator';


export class CreateUserDto {
@IsString()
@ApiProperty({
  example: 'Junior lima de oliveira',
})
Name:string;

@IsString()
@ApiProperty({
  example: 'junin.oliveira@gmail.com',
})
Email:string;

@IsString()
@ApiProperty({
  example: 'Junior@123',
})
Password:string;

@IsString()
@ApiProperty({
  example: 'abbb7373-c58c-4c14-bd06-c7ae0a703ea7',
})
categoryID:string;
}
