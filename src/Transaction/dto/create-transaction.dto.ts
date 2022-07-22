import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import {IsNumber,IsString} from 'class-validator';


export class CreateTransactionDto {

  @IsString()
@ApiProperty({
  example: 'Id do usuário que está enviando o valor',
})
payerID:string;

@IsNumber()
@ApiProperty({
  example: 'Valor da transferência',
})
value:number;

@IsString()
@ApiProperty({
  example: 'Id do usuário que está recebendo',
})
payeeID:string;
}
