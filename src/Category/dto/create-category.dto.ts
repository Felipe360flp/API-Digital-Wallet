import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import {IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';


export class CreateCategoryDto {
@IsString()
@ApiProperty({
  description:'Escolher um dos tipos de categoria!',
  example: 'ADMIN OR COMMON',
})
Title:string;

@IsString()
@ApiProperty({
  description:'Dar um limite de acesso ao usuário!',
  example: 'fa46bc8a-9ea7-485a-a76f-e654ead9a08d',
})
Description:string;
}
