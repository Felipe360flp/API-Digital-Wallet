import { Body,Controller,Get,Post,Res,Param,Patch,Delete,HttpCode,HttpStatus,UseGuards} from '@nestjs/common';
import { ApiTags,ApiOperation,ApiBearerAuth} from '@nestjs/swagger';
import { exit } from 'process';
import { CreateUserDto } from './dto/users-create.dto';
import {UpdateUserDto} from './dto/users-update.dto';
import { User } from './entities/users.entity';
import { UserService } from './service.users';
import { AuthGuard } from '@nestjs/passport';
import { IsUppercase } from 'class-validator';
import { isAdmin } from 'src/Utils/isAdmin.utils';
import { LoggedUser } from 'src/Auth/logged-user.decorator';

@ApiTags("Users")
@Controller("Users")
export class UserController{
  constructor(private userService: UserService){}

  @Get()
  @ApiOperation({
    summary: 'Localizar todos os usuários',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  findAll(){
    return this.userService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: 'Localizar um usuário',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  findOne(@Param("id") Id:string){
    return this.userService.findById(Id)
  }

  @Post()
  @ApiOperation({
    summary: 'Adicionar um usuário',
  })

  @IsUppercase()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @IsUppercase()
  @Patch(':id')
  @ApiOperation({
    summary: 'Alterar dados de um usuário',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() dto: UpdateUserDto,@LoggedUser() user:User){
    isAdmin(user);
    return this.userService.update(id, dto);
  }

  @Delete(':id')
      @ApiOperation({
        summary: 'Deletar um usuário',
      })
      @HttpCode(HttpStatus.NO_CONTENT)
      @UseGuards(AuthGuard())
      @ApiBearerAuth()
      delete(@Param('id') id: string,@LoggedUser() user:User) {
        isAdmin(user);
      this.userService.delete(id);
  }

}


