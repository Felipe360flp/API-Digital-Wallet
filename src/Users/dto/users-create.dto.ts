import { ApiProperty } from '@nestjs/swagger';
import { Category } from '@prisma/client';
import {IsEmail, IsNumber, IsString, IsUUID } from 'class-validator';


export class CreateUserDto {
@IsString()
@ApiProperty({
  example:'Afonso de campos nunes',
})
name:string;

@IsEmail()
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
  example:'Afonso@123',
})
confirmPassword:string;

@ApiProperty({
  example:'05865489956'
})
cpf_cnpj:string;

}




