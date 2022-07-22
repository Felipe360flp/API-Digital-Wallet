import { Injectable, NotAcceptableException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/users-create.dto';
import {UpdateUserDto} from './dto/users-update.dto';
import { PrismaService } from '../prisma/prisma.service';
import { handleError } from 'src/Utils/handle-error.util';
import * as bcrypt from 'bcrypt';
import { Prisma, User } from '@prisma/client';
import { userInfo } from 'os';
import { UpdateCategoryDto } from 'src/Category/dto/update-category.dto';
import { Category } from 'src/Category/entities/category-entity';
import { identity } from 'rxjs';
import { CreateCategoryDto } from 'src/Category/dto/create-category.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService){}

  findAll(){
    return this.prisma.user.findMany({
      select:{
        name:true,
        email:true,
      }
    });
  }

  findById(id: string){
    const record = this.prisma.user.findUnique({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado.`);
    }
    return record;
  }

  findOne(id: string) {
    return this.findById(id);
  }

  async create(dto: CreateUserDto) {
    const data: Prisma.UserCreateInput = {
      name:dto.name,
      cpf_cnpj:dto.cpf_cnpj,
      email:dto.email,
      password:await bcrypt.hash(dto.password, 10),
      confirmPassword: await bcrypt.hash(dto.password, 10),
      wallet:0,
      category:{
        connect:{
          id:dto.categoryID
          }
        }
      }

      return this.prisma.user
      .create({
          data,
          select: {
            id:true,
            name:true,
            email:true,
            password:false,
            category: {
              select: {
                Title: true,
                Description:true
              }
          }
        }
      }).catch(handleError);
  }



  async update(id: string,dto: UpdateUserDto){
    await this.findById(id);

    const data: Prisma.UserUpdateInput = {
      name:dto.name,
      email:dto.email,
      password:await bcrypt.hash(dto.password, 10),
      confirmPassword:await bcrypt.hash(dto.password, 10),
      category:{
        connect:{
          id:dto.categoryID
        }
      }
    }


    return this.prisma.user
      .update({
      where: { id },
      data,
      select: {
        id:true,
        name:true,
        email:true,
        password:false,
        confirmPassword:false,
        category: {
          select: {
            Title: true,
            Description:true
          }
        }
      }
    }).catch(handleError);
  }


  async delete(id: string) {
    await this.findById(id);
    await this.prisma.user.delete({ where: { id } });
  }

}
