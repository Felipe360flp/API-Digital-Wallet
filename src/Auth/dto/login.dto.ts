import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email do usuário',
    example: 'Acamposn@gmail.com',
  })
  email:string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Senha do usuário',
    example: 'Afonso@123',
  })
  password:string;
}
