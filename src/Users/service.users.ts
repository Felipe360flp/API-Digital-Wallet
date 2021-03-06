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
        Name:true,
        Email:true,
      }
    });
  }

  findById(Id: string){
    const record = this.prisma.user.findUnique({
      where: { Id },
    });

    if (!record) {
      throw new NotFoundException(`Registro com o ID '${Id}' não encontrado.`);
    }
    return record;
  }

  findOne(id: string) {
    return this.findById(id);
  }

  async create(dto: CreateUserDto) {
    const data: Prisma.UserCreateInput = {
      Name:dto.Name,
      Email:dto.Email,
      Password:await bcrypt.hash(dto.Password, 10),
      category:{
        connect:{
          Id:dto.categoryID
          }
        }
      }

      return this.prisma.user
      .create({
          data,
          select: {
            Id:true,
            Name:true,
            Email:true,
            Password:false,
            category: {
              select: {
                Title: true,
                Description:true
              }
          }
        }
      }).catch(handleError);
  }



  async update(Id: string,dto: UpdateUserDto){
    await this.findById(Id);

    const data: Prisma.UserUpdateInput = {
      Name:dto.Name,
      Email:dto.Email,
      Password:await bcrypt.hash(dto.Password, 10),
      category:{
        connect:{
          Id:dto.categoryID
        }
      }
    }


    return this.prisma.user
      .update({
      where: { Id },
      data,
      select: {
        Id:true,
        Name:true,
        Email:true,
        Password:false,
        category: {
          select: {
            Title: true,
            Description:true
          }
        }
      }
    }).catch(handleError);
  }


  async delete(Id: string) {
    await this.findById(Id);

    await this.prisma.category.delete({ where: { Id } });
  }

}
