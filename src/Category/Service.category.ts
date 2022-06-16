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

  async findById(Id: string){
    const record = await this.prisma.category.findUnique({ where: { Id }});

    if (!record) {
      throw new NotFoundException(`Registro com o '${Id}' não encontrado.`)
    }

    return record;
  }

  async findOne(id: string){
    return this.findById(id);
  }

  async create(dto: CreateCategoryDto) {
    const data: Prisma.CategoryCreateInput = {
      Title:dto.Title,
      Description:dto.Description
    }

    return this.prisma.category
      .create({
        data,
        select: {
          Id: true,
          Title:true,
          Description:true
        }
      }).catch(handleError);
  }



    async update(Id: string, dto: UpdateCategoryDto){
    await this.findOne(Id);
    const data: Prisma.CategoryUpdateInput = {
      Title:dto.Title,
    }

    return this.prisma.category
    .update({
      where: { Id },
      data,
      select: {
        Id: true,
        Title:true,
        Description:true
      },
    }).catch(handleError);
  }

  async delete(Id: string) {
    await this.findOne(Id);
    await this.prisma.category.delete({ where: { Id } });
  }

}
