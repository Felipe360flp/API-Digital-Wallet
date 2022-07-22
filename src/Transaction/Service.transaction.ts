import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import {Transaction} from './entities/transaction-entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { identity } from 'rxjs';
import { stringify } from 'querystring';
import { handleError } from 'src/Utils/handle-error.util';
import { Prisma } from '@prisma/client';
import { isUppercase } from 'class-validator';
import { User } from 'src/Users/entities/users.entity';
import { userInfo } from 'os';
import { LoggedUser } from 'src/Auth/logged-user.decorator';


@Injectable()
export class TransactionService {

  constructor(private readonly prisma: PrismaService) {}

  findAll(user:User) {
    return this.prisma.transaction.findMany({where:{id:user.id}});
  }

  findById(@LoggedUser() user:User){
    const record =  this.prisma.transaction.findUnique({ where:{id:user.id}});

    if (!record) {
      throw new NotFoundException(`Registro com o '${user.id}' não encontrado.`)
    }

    return record;
  }

  create(user:User,dto: CreateTransactionDto) {
    const data: Prisma.TransactionCreateInput = {
      value:dto.value,
      user:{
        connect:
        {
          id:user.id
        }
      }
    }

    return this.prisma.transaction
      .create({
        data,
        select: {
          value: true,
          receiverID:true,
          user:
          {
            select:{
              id:true,
              name:true,
            }
          }
        }
      }).catch(handleError);
  }



    update(user:User, dto: UpdateTransactionDto){
      this.findOne(user.id);
      const data: Prisma.TransactionUpdateInput = {
        value:dto.value,
        receivedID:dto.receiverID,
        user:{
          connect:
          {
            id:user.id
          }
        }
    }

    return this.prisma.transaction
    .update({
      where: {id},
      data,
      select: {
        value:true,
        receiverID:true,
        user:{
          select:
          {
            id:true,
            Name:true,
          }
        }
      },
    }).catch(handleError);
  }

  async delete(id: string) {
    await this.findOne(id);
    await this.prisma.category.delete({ where: {id} });
  }

}
