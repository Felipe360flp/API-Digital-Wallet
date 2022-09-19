import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/users-create.dto';
import {UpdateUserDto} from './dto/users-update.dto';
import { PrismaService } from '../prisma/prisma.service';
import { handleError } from 'src/Utils/handle-error.util';
import * as bcrypt from 'bcrypt';
import { Prisma} from '@prisma/client';
import { User } from './entities/users.entity';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService){}

  async findAll(){
    return await this.prisma.user.findMany({
      select:{
        name:true,
        email:true,
        cpf_cnpj:true,
        wallet:true
      }
    });
  }

  findById(id: string){
    const record = this.prisma.user.findUnique({
      where: { id },
    });

    if (!record) {
      throw new BadRequestException('As senhas informadas não são iguais.');
    }
    return record;
  }

  findOne(id: string) {
    return this.findById(id);
  }

  async createADM(dto: CreateUserDto) {

    if (dto.password != dto.confirmPassword) {
      throw new BadRequestException('As senhas informadas não são iguais.');
    }

    delete dto.confirmPassword;

    const data: Prisma.UserCreateInput = {
      name:dto.name,
      cpf_cnpj:dto.cpf_cnpj,
      email:dto.email,
      password:await bcrypt.hash(dto.password, 10),
      category:{
        connect:{
          Title:'ADMIN',
        }
      }
    }

    return this.prisma.user
    .create({
      data,
      select:{
        name:true,
        cpf_cnpj:true,
        email:true,
        password:false,
        category:{
          select:{
            id:true,
          }
        }
      }
    });
  }


  async create(dto: CreateUserDto) {

    if (dto.password != dto.confirmPassword) {
      throw new BadRequestException('As senhas informadas não são iguais.');
    }

    delete dto.confirmPassword;

    const data: Prisma.UserCreateInput = {
      name:dto.name,
      cpf_cnpj:dto.cpf_cnpj,
      email:dto.email,
      password:await bcrypt.hash(dto.password, 10),
      category:{
        connect:{
          Title:'COMMON',
        }
      }
    }

    return this.prisma.user
    .create({
      data,
      select:{
        name:true,
        cpf_cnpj:true,
        email:true,
        password:false,
        category:{
          select:{
            Title:true,
          }
        }
      }
    });
  }

  async update(dto: UpdateUserDto,user:Partial<User>){
    await this.findById(user.id);

    if (dto.password != dto.confirmPassword) {
      throw new BadRequestException('As senhas informadas não são iguais.');
    }

    delete dto.confirmPassword;

    const data: Prisma.UserUpdateInput = {
      name:dto.name,
      email:dto.email,
      password:await bcrypt.hash(dto.password, 10),
    }
    return this.prisma.user
      .update({
      where: {id:user.id},
      data,
      select: {
        id:true,
        name:true,
        email:true,
        password:false,
      }
    }).catch(handleError);
  }


  async delete(id: string) {
    await this.findById(id);
    await this.prisma.user.delete({ where: { id } });
  }

}
