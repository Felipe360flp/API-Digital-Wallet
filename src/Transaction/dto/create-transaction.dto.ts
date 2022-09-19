import { ApiProperty } from '@nestjs/swagger';
import {IsNumber,IsString} from 'class-validator';


export class CreateTransactionDto {

  @IsString()
  @ApiProperty({
    description:'Id do destinatário',
  example: 'a558e119-4bbb-4158-afeb-58a7805ed5dd',
  })
  payeeID:string;

  @IsNumber()
  @ApiProperty({
    description:'Valor da transferência',
  example: '150',
  })
  value:number;
  }


