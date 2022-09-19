import { BadRequestException, Injectable, NotFoundException, Param, UnprocessableEntityException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/Utils/handle-error.util';
import { Prisma } from '@prisma/client';
import { User } from 'src/Users/entities/users.entity';
import { isAdmin } from 'src/Utils/isAdmin.utils';

@Injectable()
export class TransactionService {

  constructor(private readonly prisma: PrismaService) {}

  async findAll(user:User) {
      return await this.prisma.transaction.findMany({
        where:{payerID:user.id},
        select:{
          payee:{
            select:{
              id:true,
              name:true,
            }
          },
          value:true
        }
      });
  }

  findById(id:string){
    const record =  this.prisma.transaction.findUnique({ where:{id:id}});

    if (!record) {
      throw new NotFoundException(`Registro com o '${id}' não encontrado.`)
    }

    return record;
  }

  async sendValue(dto: CreateTransactionDto,user:User){

      const data: Prisma.TransactionCreateInput = {
        payerID:user.id,
        payee:{
          connect:{
            id:dto.payeeID
          }
        },
        value:dto.value
      }

    const receiver = await this.prisma.user.findUnique({where:{id:dto.payeeID}});

    await this.prisma.user.update({
      where:{id:user.id},
      data:{
      wallet:user.wallet - dto.value
      },
    });

    await this.prisma.user.update({
      where:{id:receiver.id},
      data:{
      wallet:receiver.wallet + dto.value
      }
    });

    return this.prisma.transaction
      .create({
        data,
        select:{
          payerID:true,
          payee:{
            select:{
              id:true,
              name:true
            }
          },
          value:true
        }
      }).catch(handleError);
    }


    async reverseTransaction(id:string,user:User){
      this.findById(user.id);
    }

  async delete(id: string,user:User) {
    isAdmin(user);
    this.findById(id);
    throw new BadRequestException('Transação deletada com sucesso!');
    await this.prisma.transaction.delete({ where: {id} });
  }

}
