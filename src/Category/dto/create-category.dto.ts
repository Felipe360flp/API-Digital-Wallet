import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import {IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';


export class CreateCategoryDto {
@IsString()
@ApiProperty({
  example: 'ADMIN OR COMMON',
})
Title:string;

@IsString()
@ApiProperty({
  example: 'Tipo de permissão',
})
Description:string;
}
