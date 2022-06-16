import { Controller,Body,Post,HttpCode,HttpStatus,Get } from '@nestjs/common';
import { ApiOperation,ApiTags,ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './Service.auth';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';

@Controller('Auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Realizar login, recebendo um token de autenticação',
  })

  login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(loginDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Retorna o usuário autenticado no momento',
  })
  @ApiBearerAuth()
  profile() {
    return { message: 'Autenticação bem sucedida' };
  }
}
