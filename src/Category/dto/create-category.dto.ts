import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import {IsNumber, IsString } from 'class-validator';


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

@IsNumber()
@ApiProperty({
  example: 'Lista de usuários',
})
users?:User[];
}
