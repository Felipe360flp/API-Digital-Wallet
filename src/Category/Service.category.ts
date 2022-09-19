import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category} from './entities/category-entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { identity } from 'rxjs';
import { stringify } from 'querystring';
import { handleError } from 'src/Utils/handle-error.util';
import { Prisma } from '@prisma/client';
import { isUppercase } from 'class-validator';
import { CreateUserDto } from 'src/Users/dto/users-create.dto';
import { User } from 'src/Users/entities/users.entity';


@Injectable()
export class CategoryService {

  category: Category[] = [];

  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.category.findMany();
  }

  findById(id: string){
    const record =  this.prisma.category.findUnique({ where: { id }});

    if (!record) {
      throw new NotFoundException(`Registro com o '${id}' não encontrado.`)
    }

    return record;
  }

  findOne(id: string){
    return this.findById(id);
  }

  async create(dto: CreateCategoryDto) {
    const data: Prisma.CategoryCreateInput = {
      Title:dto.Title,
      Description:dto.Description
    }

    return  this.prisma.category
      .create({
        data,
        select: {
          id: true,
          Title:true,
          Description:true
        }
      }).catch(handleError);
  }



    async update(id: string, dto: UpdateCategoryDto){
      this.findOne(id);
      const data: Prisma.CategoryUpdateInput = {
      Title:dto.Title,
    }

    return this.prisma.category
    .update({
      where: { id },
      data,
      select: {
        id: true,
        Title:true,
        Description:true
      },
    }).catch(handleError);
  }

  async delete(id: string) {
    await this.findOne(id);
    await this.prisma.category.delete({ where: { id } });
  }

}

