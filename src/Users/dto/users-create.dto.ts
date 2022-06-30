import { ApiProperty } from '@nestjs/swagger';
import { Category } from '@prisma/client';
import {IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';


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

@IsUUID("all",{each:true})
@IsOptional()
@IsString()
@ApiProperty({
  example: 'Id da categoria',
})
categoryID:string;
}
