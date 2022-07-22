import { ApiProperty } from '@nestjs/swagger';
import { Category } from '@prisma/client';
import {IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';


export class CreateUserDto {
@IsString()
@ApiProperty({
  example:'Afonso de campos nunes',
})
name:string;

@IsString()
@ApiProperty({
  example: 'Acamposn@gmail.com',
})
email:string;

@IsString()
@ApiProperty({
  example: 'Afonso@123',
})
password:string;

@IsString()
@ApiProperty({
  example: 'Afonso@123',
})
confirmPassword:string;

@IsNumber()
@ApiProperty({
  example: '05865489956',
})
cpf_cnpj:number;

@IsUUID("all",{each:true})
@IsOptional()
@IsString()
@ApiProperty({
  example: 'djkhsahidsajdklsajhkldhsau',
})
categoryID:string;
}
