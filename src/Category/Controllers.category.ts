import { Body,Controller, Get,Post,Res,Param,Patch,Delete,HttpCode,HttpStatus, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags,ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { prisma } from '@prisma/client';
import { IsUppercase } from 'class-validator';
import { exit } from 'process';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category-entity';
import { CategoryService } from './Service.category';
import { isAdmin } from 'src/Utils/isAdmin.utils';
import { User } from 'src/Users/entities/users.entity';
import { LoggedUser } from 'src/Auth/logged-user.decorator';

@ApiTags('Category')
@Controller('Category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar os tipos de categoria disponíveis',
  })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Localizar uma categoria',
  })

  findOne(@Param('id') id: string){
    return this.categoryService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Adicionar uma categoria (Permissão)',
  })
  @IsUppercase()
  create(@Body() createCategoryDto: CreateCategoryDto) {

    if(
      !createCategoryDto.Title
      ){
        return console.log("it is necessary to fill in all the fields!")
      }
      else{
      return this.categoryService.create(createCategoryDto);
      }
  }

  @IsUppercase()
  @Patch(':id')
  @ApiOperation({
    summary: 'Alterar uma categoria',
  })
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto,@LoggedUser() user:User){
    return this.categoryService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletar uma categoria',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string,@LoggedUser() user:User) {
    this.categoryService.delete(id);
  }
}
