import { Body,Controller, Get,Post,Res,Param,Patch,Delete,HttpCode,HttpStatus, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags,ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { prisma } from '@prisma/client';
import { IsUppercase } from 'class-validator';
import { exit } from 'process';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionService } from './Service.transaction';
import { isAdmin } from 'src/Utils/isAdmin.utils';
import { User } from 'src/Users/entities/users.entity';
import { LoggedUser } from 'src/Auth/logged-user.decorator';

@ApiTags('Transaction')
@Controller('Transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar todas as transações do usuário logado',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  findAll(@LoggedUser() user:User) {
    return this.transactionService.findAll(user);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Localizar as transações de um usuário específico (ADM)',// incluir função isAdmin
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  findOne(@LoggedUser() user:User){
    return this.transactionService.findById(user);
  }

  @Post()
  @ApiOperation({
    summary: 'Realizar uma transação',
  })
  @IsUppercase()
  create(@LoggedUser() user:User,@Body() dto: CreateTransactionDto) {

    if(
      !dto.value &&
      !dto.receiverID
      ){
        return console.log("it is necessary to fill in all the fields!")
      }
      else{
      return this.transactionService.create(user,dto)
      }
  }

  @IsUppercase() // Incluir função isAdmin
  @Patch(':id')
  @ApiOperation({
    summary: 'Fazer um estorno de valores caso necessário',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  update(@Body() dto: UpdateTransactionDto,@LoggedUser() user:User){
    isAdmin(user);
    return this.transactionService.update(user, dto);
  }

  @Delete(':id') // incluir função isAdmin
  @ApiOperation({
    summary: 'Deletar uma transação (Apenas quando um estorno for realizado)',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  delete(@Param('id') id: string,@LoggedUser() user:User) {
    isAdmin(user);
    return this.transactionService.delete(id);
  }
}
