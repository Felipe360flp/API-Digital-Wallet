import { Body,Controller, Get,Post,Res,Param,Patch,Delete,HttpCode,HttpStatus, UseGuards, Put} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags,ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { prisma} from '@prisma/client';
import { IsUppercase } from 'class-validator';
import { exit } from 'process';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionService } from './Service.transaction';
import { Transaction } from './entities/transaction-entity';
import { isAdmin } from 'src/Utils/isAdmin.utils';
import { User } from 'src/Users/entities/users.entity';
import { LoggedUser } from 'src/Auth/logged-user.decorator';
import { identity } from 'rxjs';

@ApiTags('Transaction')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('Transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get('/transactions-record')
  @ApiOperation({
    summary: 'Listar todas as transações do usuário logado',
  })
  findAll(@LoggedUser() user:User) {
    return this.transactionService.findAll(user.id);
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Localizar as transações de um usuário específico (ADM)',// incluir função isAdmin
  })
  findOne(@Param() id:string,@LoggedUser() user:User){
    return this.transactionService.findById(user.id);
  }

  @Post()
  @ApiOperation({
    summary: 'Realizar uma transação',
  })
  create(@Body() dto: CreateTransactionDto,@LoggedUser() user:User){
    return this.transactionService.sendValue(dto,user)
  }

  @IsUppercase()
  @Post(':id')
  @ApiOperation({
    summary: 'Fazer um estorno de valores caso necessário (Admin)',
  })
  update(@Param() id:string, @LoggedUser() user:User)
  {
    return this.transactionService.reverseTransaction(id,user);
  }

  @Delete(':id') // incluir função isAdmin
  @ApiOperation({
    summary: 'Deletar uma transação (Admin)',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string,@LoggedUser() user:User) {
    return this.transactionService.delete(id,user);
  }
}
