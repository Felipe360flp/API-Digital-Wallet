import { Body,Controller,Get,Post,Res,Param,Patch,Delete,HttpCode,HttpStatus,UseGuards} from '@nestjs/common';
import { ApiTags,ApiOperation,ApiBearerAuth} from '@nestjs/swagger';
import { exit } from 'process';
import { CreateUserDto } from './dto/users-create.dto';
import {UpdateUserDto} from './dto/users-update.dto';
import { User } from './entities/Users.entity';
import { UserService } from './service.users';
import { AuthGuard } from '@nestjs/passport';


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
  findOne(@Param("id") id:string):Promise<User>{
    return this.userService.findOne(id)
  }


    @Patch(':id')
    @ApiOperation({
      summary: 'Alterar um usuário',
    })
      @UseGuards(AuthGuard())
      @ApiBearerAuth()
      update(@Param('id') id: string, @Body() dto: UpdateUserDto): Promise<User> {
        return this.userService.update(id, dto);
      }

      @Delete(':id')
      @ApiOperation({
        summary: 'Deletar um usuário',
      })
      @HttpCode(HttpStatus.NO_CONTENT)
      @UseGuards(AuthGuard())
      @ApiBearerAuth()
      delete(@Param('id') id: string) {
      this.userService.delete(id);
  }

}
