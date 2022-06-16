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
    return this.prisma.user.findMany();
  }

  async findById(id: string){
    const record = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado.`);
    }
    return record;
  }

  async findOne(id: string) {
    return this.findById(id);
  }

  async create(dto: CreateUserDto) {
      const data: Prisma.UserCreateInput = {
        Name:dto.Name,
        Email:dto.Email,
        Password:await bcrypt.hash(dto.Password, 10),
        category:{
          connect:{
            Id:dto.categoryID,
          },
        },
      }

      return this.prisma.user
      .create({
          data,
          select: {
            id:true,
            Name:true,
            Email:true,
            Password:true,
            category: {
              select: {
                Title: true
              }
          }
        }
      }).catch(handleError);
    }


  async update(id: string,dto: UpdateUserDto){
    await this.findById(id);

    const data: Prisma.UserUpdateInput = {
      Name:dto.Name,
        Email:dto.Email,
        Password:await bcrypt.hash(dto.Password, 10),
        category:{
          connect:{
            Id:dto.categoryID,
          },
        },
      }

    return this.prisma.category
      .update({
      where: { id },
      data,
      select: {
        id:true,
          Name:true,
          Email:true,
          Password:true,
        category: {
          select: {
            Title: true
          }
        }
      },
    }).catch(handleError);
  }


  async delete(id: string) {
    await this.findById(id);

    await this.prisma.category.delete({ where: { id } });
  }

}
